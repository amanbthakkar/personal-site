import React from 'react';
import PropTypes from 'prop-types';

function MetricsStrip({ latest, onchainAvailable }) {
  if (!latest) return null;

  const fmt = (v, digits = 2) => {
    if (v === null || v === undefined || Number.isNaN(v)) return '—';
    return Number(v).toLocaleString(undefined, {
      maximumFractionDigits: digits,
      minimumFractionDigits: 0,
    });
  };

  const items = [
    { label: 'Price', value: `$${fmt(latest.price, 0)}` },
    { label: 'PLO rank', value: fmt(latest.plo_rank, 2) },
    { label: 'σ-risk', value: fmt(latest.plo_risk_sigma, 2) },
    { label: 'MA stretch', value: fmt(latest.cowen_style_v2, 2) },
    { label: 'Mayer', value: fmt(latest.mayer, 2) },
  ];
  if (onchainAvailable) {
    items.push(
      { label: 'MVRV', value: fmt(latest.mvrv, 2) },
      { label: 'NUPL', value: fmt(latest.nupl, 2) },
    );
  } else {
    items.push({ label: 'PLO residual', value: fmt(latest.plo_residual, 2) });
  }

  return (
    <div className='indicator-metrics' role='list'>
      {items.map((item) => (
        <div key={item.label} className='indicator-metric' role='listitem'>
          <div className='indicator-metric-label'>{item.label}</div>
          <div className='indicator-metric-value'>{item.value}</div>
        </div>
      ))}
    </div>
  );
}

MetricsStrip.propTypes = {
  latest: PropTypes.object,
  onchainAvailable: PropTypes.bool,
};

MetricsStrip.defaultProps = {
  latest: null,
  onchainAvailable: false,
};

export default MetricsStrip;
