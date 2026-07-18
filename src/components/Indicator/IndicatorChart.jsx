import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
);

/** Sample every Nth point for UI performance while keeping the full series available. */
const STRIDE = 3;

function jetColor(t) {
  const x = Math.min(1, Math.max(0, t));
  const r = Math.round(255 * Math.min(1, Math.max(0, 1.5 - Math.abs(4 * x - 3))));
  const g = Math.round(255 * Math.min(1, Math.max(0, 1.5 - Math.abs(4 * x - 2))));
  const b = Math.round(255 * Math.min(1, Math.max(0, 1.5 - Math.abs(4 * x - 1))));
  return `rgb(${r},${g},${b})`;
}

function sample(arr, stride = STRIDE) {
  if (!arr) return [];
  const out = [];
  for (let i = 0; i < arr.length; i += stride) out.push(arr[i]);
  if ((arr.length - 1) % stride !== 0) out.push(arr[arr.length - 1]);
  return out;
}

function IndicatorChart({ data, viewId }) {
  const chart = useMemo(() => {
    if (!data) return null;
    const dates = sample(data.dates);
    const price = sample(data.price);
    const s = data.series;

    const labels = dates;
    const logPrice = price.map((p) => (p > 0 ? Math.log(p) : null));

    if (viewId === 'plo_decile' || viewId === 'plo_rank') {
      const colorSrc =
        viewId === 'plo_decile'
          ? sample(s.plo_decile).map((d) => jetColor(((d || 1) - 1) / 9))
          : sample(s.plo_rank).map((r) => jetColor(r ?? 0.5));
      return {
        type: 'scatter',
        data: {
          datasets: [
            {
              label: 'ln(price)',
              data: labels.map((d, i) => ({ x: i, y: logPrice[i] })),
              parsing: false,
              pointRadius: 1.5,
              pointHoverRadius: 4,
              pointBackgroundColor: colorSrc,
              pointBorderWidth: 0,
              showLine: false,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                title: (items) => {
                  const i = items[0]?.raw?.x;
                  return typeof i === 'number' ? labels[i] : '';
                },
                label: (item) => {
                  const i = item.raw.x;
                  const p = price[i];
                  const extra =
                    viewId === 'plo_decile'
                      ? `decile ${sample(s.plo_decile)[i]}`
                      : `rank ${Number(sample(s.plo_rank)[i]).toFixed(2)}`;
                  return `$${Number(p).toLocaleString()} · ${extra}`;
                },
              },
            },
          },
          scales: {
            x: {
              type: 'linear',
              ticks: {
                callback: (v) => {
                  const i = Math.round(v);
                  if (i < 0 || i >= labels.length) return '';
                  if (i % Math.ceil(labels.length / 6) !== 0) return '';
                  return labels[i]?.slice(0, 4);
                },
              },
              title: { display: true, text: 'Date' },
            },
            y: { title: { display: true, text: 'ln(BTC/USD)' } },
          },
        },
      };
    }

    const line = (key, label, color) => ({
      label,
      data: sample(s[key]),
      borderColor: color,
      backgroundColor: color,
      borderWidth: 1.5,
      pointRadius: 0,
      tension: 0.1,
    });

    if (viewId === 'plo_residual') {
      return {
        type: 'line',
        data: { labels, datasets: [line('plo_residual', 'PLO residual', '#c0392b')] },
        options: baseLineOptions('Residual (log₁₀)'),
      };
    }
    if (viewId === 'plo_risk_sigma') {
      return {
        type: 'line',
        data: {
          labels,
          datasets: [line('plo_risk_sigma', 'σ-mapped risk', '#8e44ad')],
        },
        options: baseLineOptions('Risk (0–1)', 0, 1),
      };
    }
    if (viewId === 'cowen_style_v2') {
      return {
        type: 'line',
        data: {
          labels,
          datasets: [line('cowen_style_v2', 'Cowen-style risk', '#d35400')],
        },
        options: baseLineOptions('Risk (0–1)', 0, 1),
      };
    }
    if (viewId === 'mayer') {
      return {
        type: 'line',
        data: { labels, datasets: [line('mayer', 'Mayer Multiple', '#2980b9')] },
        options: baseLineOptions('P / MA200'),
      };
    }
    if (viewId === 'corridor') {
      return {
        type: 'line',
        data: {
          labels,
          datasets: [
            {
              label: 'Price',
              data: price,
              borderColor: '#f39c12',
              borderWidth: 1.2,
              pointRadius: 0,
            },
            {
              label: 'Fair value',
              data: sample(s.fair_value),
              borderColor: '#2c3e50',
              borderWidth: 1.5,
              pointRadius: 0,
            },
            {
              label: '+1.5σ',
              data: sample(s.fair_value_upper),
              borderColor: '#e74c3c',
              borderWidth: 1,
              borderDash: [4, 4],
              pointRadius: 0,
            },
            {
              label: '−1.5σ',
              data: sample(s.fair_value_lower),
              borderColor: '#27ae60',
              borderWidth: 1,
              borderDash: [4, 4],
              pointRadius: 0,
            },
          ],
        },
        options: {
          ...baseLineOptions('BTC/USD (log)'),
          scales: {
            x: { ticks: { maxTicksLimit: 8 } },
            y: { type: 'logarithmic', title: { display: true, text: 'BTC/USD' } },
          },
        },
      };
    }
    if (viewId === 'pi_cycle') {
      return {
        type: 'line',
        data: {
          labels,
          datasets: [
            {
              label: 'Price',
              data: price,
              borderColor: '#f39c12',
              borderWidth: 1.2,
              pointRadius: 0,
            },
            {
              label: 'SMA 111',
              data: sample(s.pi_cycle_111),
              borderColor: '#3498db',
              borderWidth: 1.5,
              pointRadius: 0,
            },
            {
              label: '2× SMA 350',
              data: sample(s.pi_cycle_350x2),
              borderColor: '#e74c3c',
              borderWidth: 1.5,
              pointRadius: 0,
            },
          ],
        },
        options: {
          ...baseLineOptions('BTC/USD (log)'),
          scales: {
            x: { ticks: { maxTicksLimit: 8 } },
            y: { type: 'logarithmic', title: { display: true, text: 'BTC/USD' } },
          },
        },
      };
    }

    return null;
  }, [data, viewId]);

  if (!chart) return null;

  return (
    <div className='indicator-chart-wrap'>
      <Chart type={chart.type} data={chart.data} options={chart.options} />
    </div>
  );
}

function baseLineOptions(yTitle, min, max) {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: true, position: 'bottom' } },
    scales: {
      x: { ticks: { maxTicksLimit: 8 } },
      y: {
        title: { display: true, text: yTitle },
        min,
        max,
      },
    },
  };
}

IndicatorChart.propTypes = {
  data: PropTypes.object,
  viewId: PropTypes.string.isRequired,
};

IndicatorChart.defaultProps = {
  data: null,
};

export default IndicatorChart;
