export const INDICATOR_JSON_URL = 'https://cloud.amanthakkar.com/indicators.json';
export const INDICATOR_PNG_URL = 'https://cloud.amanthakkar.com/indicator.png';

export const VIEWS = [
  {
    id: 'plo_decile',
    label: 'PLO deciles',
    group: 'power',
    blurb:
      'Power Law Oscillator residual colored by expanding decile bands (1–10). Blue ≈ historically cheap; red ≈ historically rich. Same idea as the original daily chart.',
  },
  {
    id: 'plo_rank',
    label: 'PLO continuous',
    group: 'power',
    blurb:
      'Same expanding power-law residual, colored by continuous expanding percentile rank (0–1) instead of ten coarse bins — more detail near tops and bottoms.',
  },
  {
    id: 'plo_residual',
    label: 'PLO residual',
    group: 'power',
    blurb:
      'Raw Burger-style log₁₀ residual (actual vs expanding power-law fit). Historical cycle tops often clustered near about 0.8–0.9 (~6–8× the trend).',
  },
  {
    id: 'plo_risk_sigma',
    label: 'σ-mapped risk',
    group: 'power',
    blurb:
      'Expanding residual z-score clamped to ±3σ and mapped to 0–1. A Cowen-like gauge that still uses power-law math (not a moving average).',
  },
  {
    id: 'corridor',
    label: 'Fair-value corridor',
    group: 'power',
    blurb:
      'Global Santostasi-style log-log fair value with ±1.5σ bands. Useful for long-run context; unlike PLO, a full refit revises the whole history.',
  },
  {
    id: 'cowen_style_v2',
    label: 'Cowen-style',
    group: 'other',
    blurb:
      'Open recreation of a price risk metric: (ln price − ln MA365) × t^0.395, then expanding min–max to 0–1. Not official Into The Cryptoverse code.',
  },
  {
    id: 'mayer',
    label: 'Mayer Multiple',
    group: 'other',
    blurb:
      'Spot price divided by the 200-day moving average. Classic valuation ratio; tops occur at different multiples across cycles.',
  },
  {
    id: 'pi_cycle',
    label: 'Pi Cycle',
    group: 'other',
    blurb:
      '111-day SMA vs 2× 350-day SMA. A historical top signal when the faster average crosses above the slower one; shown here as an overlay on price.',
  },
];

export function viewById(id) {
  return VIEWS.find((v) => v.id === id) || VIEWS[0];
}
