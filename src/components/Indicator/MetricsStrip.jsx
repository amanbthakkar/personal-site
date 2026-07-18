import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';

function fmt(v, digits = 2) {
  if (v === null || v === undefined || Number.isNaN(v)) return '—';
  return Number(v).toLocaleString(undefined, {
    maximumFractionDigits: digits,
    minimumFractionDigits: 0,
  });
}

function MetricsStrip({ latest }) {
  if (!latest) return null;

  const items = [
    { label: 'Price', value: `$${fmt(latest.price, 0)}` },
    { label: 'PLO rank', value: fmt(latest.plo_rank, 2) },
    { label: 'σ-risk', value: fmt(latest.plo_risk_sigma, 2) },
    { label: 'Cowen-style', value: fmt(latest.cowen_style_v2, 2) },
    { label: 'Mayer', value: fmt(latest.mayer, 2) },
    { label: 'PLO residual', value: fmt(latest.plo_residual, 2) },
  ];

  return (
    <Row className='indicator-metrics g-2 mb-3'>
      {items.map((item) => (
        <Col key={item.label} xs={6} md={4} lg={2}>
          <div className='indicator-metric'>
            <div className='indicator-metric-label'>{item.label}</div>
            <div className='indicator-metric-value'>{item.value}</div>
          </div>
        </Col>
      ))}
    </Row>
  );
}

MetricsStrip.propTypes = {
  latest: PropTypes.object,
};

MetricsStrip.defaultProps = {
  latest: null,
};

export default MetricsStrip;
