export const INDICATOR_JSON_URL = 'https://cloud.amanthakkar.com/indicators.json';
export const INDICATOR_PNG_URL = 'https://cloud.amanthakkar.com/indicator.png';

export const VIEWS = [
  {
    id: 'plo_decile',
    label: 'PLO',
    group: 'power',
    groupLabel: 'Power law',
    blurb:
      'Price colored by which expanding residual decile it sits in — the original site chart.',
    explainer: {
      what: 'The Power Law Oscillator (PLO) asks how far today’s Bitcoin price sits above or below a long-run power-law trend that only uses data available up to that day.',
      construction: [
        'For each day t, fit log₁₀(price) = a + b · log₁₀(days since genesis) on all history up to t (ordinary least squares).',
        'Residual ossₜ = log₁₀(priceₜ) − fittedₜ. Positive means expensive vs that day’s trend; negative means cheap.',
        'Map ossₜ into expanding decile bands 1–10 using only residuals up to t (no look-ahead).',
        'Color each day’s log-price point by that band (jet colormap: blue → red).',
      ],
      meaning:
        'This is Harold Burger’s causal power oscillator plus percentile-band coloring. Past colors never rewrite when new prices arrive. It measures stretch vs a time-based power law, not vs a moving average.',
      howToRead: [
        'Y-axis is ln(price); X-axis is time.',
        'Dark blue / low bands ≈ residual was historically low → accumulation-leaning.',
        'Dark red / high bands ≈ residual was historically high → distribution-leaning.',
        'Cycle tops in history often land in the upper bands; prolonged blues often mark deep bear territory.',
      ],
      caveats:
        'Early years have noisy bands (few observations). Not financial advice — one signal among many.',
    },
  },
  {
    id: 'plo_rank',
    label: 'PLO rank',
    group: 'power',
    groupLabel: 'Power law',
    blurb:
      'Same PLO residual, colored by continuous expanding percentile rank (0–1).',
    explainer: {
      what: 'Identical residual math to PLO deciles, but the color scale is a continuous expanding percentile instead of ten coarse bins.',
      construction: [
        'Compute the same expanding log-log residual ossₜ.',
        'Rankₜ = fraction of {oss₀…ossₜ} that are ≤ ossₜ (expanding CDF).',
        'Color ln(price) by Rankₜ on [0, 1].',
      ],
      meaning:
        'Preserves fine structure near extremes that deciles flatten. A move from 0.92 → 0.98 is visible; in deciles both might be “band 10.”',
      howToRead: [
        'Same scatter layout as deciles.',
        'Near 0 (blue) = among the cheapest residuals seen so far.',
        'Near 1 (red) = among the richest residuals seen so far.',
        'Use when you care about gradation inside the top/bottom tails.',
      ],
      caveats:
        'Still path-dependent on history length. Extremes early in the sample are less meaningful.',
    },
  },
  {
    id: 'plo_residual',
    label: 'Residual',
    group: 'power',
    groupLabel: 'Power law',
    blurb:
      'Raw Burger-style log₁₀ residual over time (≈ −1 to +1 historically).',
    explainer: {
      what: 'Plots the raw power-law residual itself — the quantity behind the colored charts.',
      construction: [
        'Same expanding OLS on log₁₀-log₁₀ price vs day index.',
        'Series = ossₜ in log₁₀ units (not percentile-mapped).',
        'A residual of +0.8 means price is about 10^0.8 ≈ 6.3× the fitted trend that day.',
      ],
      meaning:
        'Burger observed that historical all-time highs often clustered near residuals ≈ 0.8–0.9. The residual must keep oscillating if Bitcoin keeps following a power law rather than pure exponential blow-off.',
      howToRead: [
        'Line chart: residual vs date.',
        'Around 0 ≈ on the expanding power-law fit.',
        'High positive spikes ≈ euphoric stretch; deep negatives ≈ undervaluation vs trend.',
        'Compare peak heights across cycles — similar peaks support the “magic band” idea.',
      ],
      caveats:
        'Absolute residual levels can drift as the expanding fit adapts. Pair with percentile views for regime context.',
    },
  },
  {
    id: 'plo_risk_sigma',
    label: 'σ-risk',
    group: 'power',
    groupLabel: 'Power law',
    blurb:
      'PLO residual as an expanding z-score, clamped ±3σ and mapped to 0–1.',
    explainer: {
      what: 'Turns the PLO residual into a 0–1 “risk-like” gauge without switching to a moving-average model.',
      construction: [
        'ossₜ from expanding power-law fit.',
        'zₜ = ossₜ / expanding_std(oss) (std of residuals up to t).',
        'Clamp z to [−3, +3], then risk = z/6 + 0.5 → [0, 1].',
      ],
      meaning:
        'Near 0 = unusually cheap vs recent residual volatility; near 1 = unusually rich. Bridges Burger’s residual to the language of public 0–1 risk gauges while staying on power-law math.',
      howToRead: [
        'Line on [0, 1].',
        '0.5 ≈ residual near its expanding mean (typical).',
        'Above ~0.8–0.9 = multi-sigma rich; below ~0.2 = multi-sigma cheap.',
        'Compare with MA stretch risk: agreement strengthens conviction; disagreement warrants caution.',
      ],
      caveats:
        'Expanding σ changes slowly; sudden regime shifts take time to re-scale. Not the same as official ITC risk.',
    },
  },
  {
    id: 'corridor',
    label: 'Corridor',
    group: 'power',
    groupLabel: 'Power law',
    blurb:
      'Global log-log fair value with ±1.5σ bands (Santostasi-style corridor).',
    explainer: {
      what: 'A single power-law fit to the whole sample, with a ±1.5 standard-deviation corridor in log space — a fair-value “channel.”',
      construction: [
        'Fit one OLS: log₁₀(price) = a + b · log₁₀(days) on all available data.',
        'Fair value = 10^(a + b log₁₀ days).',
        'Bands = 10^(fitted ± 1.5 · σ_residual).',
        'Plot spot price with fair value and upper/lower bands on a log price axis.',
      ],
      meaning:
        'Describes where price has typically lived relative to a long-run trend. Unlike expanding PLO, refitting revises the entire historical corridor when new data arrives.',
      howToRead: [
        'Price near the center line ≈ “fair” vs this global fit.',
        'Touching / piercing the upper band ≈ historically hot.',
        'Near or below the lower band ≈ historically depressed.',
        'Use for context; prefer expanding PLO for causal “what would you have known then.”',
      ],
      caveats:
        'Look-ahead in historical coloring of the fit. Sensitive to sample start date. Peer-reviewed work also lists break conditions (floor violations, adoption collapse, etc.).',
    },
  },
  {
    id: 'cowen_style_v2',
    label: 'MA stretch',
    group: 'other',
    groupLabel: 'Classic',
    blurb:
      'Open price-risk gauge: (ln P − ln MA365) · t^0.395, expanding min–max → 0–1.',
    explainer: {
      what: 'A price-based cycle gauge in the tradition of public “0–1 risk” recreations: how stretched spot is versus a long moving average, with a time dampener so early chaos does not dominate the scale. Not official Into The Cryptoverse code.',
      construction: [
        'MA₃₆₅ = 365-day simple moving average of price.',
        'Preavg = (ln price − ln MA₃₆₅) · t^0.395 (t = day index). The exponent dampens early hyper-volatility.',
        'Risk = (Preavg − expanding_min) / (expanding_max − expanding_min) → [0, 1].',
      ],
      meaning:
        'Measures stretch above a long moving average, adjusted so early chaos does not dominate the scale. High = historically stretched vs that construction; low = compressed / beaten-down.',
      howToRead: [
        'Line on [0, 1].',
        'Low teens / near 0 → accumulation-leaning in this framework.',
        'High 0.8–1.0 → distribution-leaning.',
        'Cross-check against PLO σ-risk: same direction = stronger story; conflict = dig deeper.',
      ],
      caveats:
        'Hyperparameters (365, 0.395) are conventional in open recreations, not sacred. Official ITC products may differ and may blend on-chain inputs.',
    },
  },
  {
    id: 'mayer',
    label: 'Mayer',
    group: 'other',
    groupLabel: 'Classic',
    blurb: 'Spot price ÷ 200-day moving average.',
    explainer: {
      what: 'A classic Bitcoin valuation ratio popularized by Trace Mayer: how extended is price versus its 200-day average.',
      construction: [
        'MA₂₀₀ = 200-day SMA of daily close.',
        'Mayer = Price / MA₂₀₀.',
      ],
      meaning:
        'Simple momentum/valuation hybrid. Historically, multiples above ~2.4 were often treated as “expensive” accumulation filters; cycle tops have printed very different peak multiples (roughly ~3.5 to >10), so it is less stable than PLO for timing exact tops.',
      howToRead: [
        'Line chart of the multiple vs time.',
        '≈1 means price equals the 200-day average.',
        'Rising sharply above 2–3 = frothy vs the medium-term mean.',
        'Below ~1 for long stretches often coincides with bear markets.',
      ],
      caveats:
        'The 200-day window is arbitrary. Does not know about power-law growth or on-chain cost basis.',
    },
  },
  {
    id: 'pi_cycle',
    label: 'Pi Cycle',
    group: 'other',
    groupLabel: 'Classic',
    blurb:
      '111-day SMA vs 2× 350-day SMA overlaid on price (log scale).',
    explainer: {
      what: 'A moving-average crossover tool that historically flashed near several Bitcoin cycle tops when the faster average crossed above the slower one.',
      construction: [
        'Fast = 111-day SMA of price.',
        'Slow = 2 × 350-day SMA of price.',
        'Plot both with spot price on a logarithmic axis.',
      ],
      meaning:
        'When the 111-day SMA crosses up through 2×350-day SMA, it has marked euphoric tops in several past cycles. It is a timing heuristic, not a valuation theory.',
      howToRead: [
        'Watch for the blue (111) line approaching/crossing the red (2×350) line from below.',
        'Wide separation with price far above both = strong trend; cross events are the classic “top warning.”',
        'Absence of a cross does not prove a top cannot form (and false/early signals exist).',
      ],
      caveats:
        'Lookback lengths are fixed conventions. Works poorly if cycle structure changes. Always confirm with slower valuation tools.',
    },
  },
  {
    id: 'mvrv',
    label: 'MVRV',
    group: 'onchain',
    groupLabel: 'On-chain',
    blurb:
      'Market Value / Realized Value (BGeometrics free feed, ~4 years).',
    explainer: {
      what: 'On-chain valuation: market capitalization divided by realized capitalization (coins valued at the price when they last moved).',
      construction: [
        'Market value ≈ circulating supply × spot price.',
        'Realized value ≈ sum over UTXOs of (coins × price at last move).',
        'MVRV = market / realized.',
        'Series from BGeometrics free API (typically ~last 4 years).',
      ],
      meaning:
        'Above 1 means the market prices coins above their aggregate on-chain cost basis (holders in profit on average). Historically, very high MVRV (~3+) aligned with euphoria; near or below 1 with deep value / capitulation.',
      howToRead: [
        'Line chart (recent history only in the free feed).',
        'Rising MVRV with price = leveraged speculative premium.',
        'MVRV compressing toward 1 in a bull = healthier; spiking far above = fragile.',
        'Compare with NUPL (closely related) and price-based PLO for confluence.',
      ],
      caveats:
        'Free history is truncated vs full-cycle Glassnode/ITC charts. Realization assumptions depend on UTXO accounting. Not the official ITC composite risk metric.',
    },
  },
  {
    id: 'mvrv_z',
    label: 'MVRV Z',
    group: 'onchain',
    groupLabel: 'On-chain',
    blurb:
      'MVRV Z-score — stretch of market cap vs realized cap in σ units.',
    explainer: {
      what: 'Standardizes how far market value sits from realized value using a z-score style transform (provider definition).',
      construction: [
        'Starts from market value and realized value over time.',
        'Z-score normalizes the gap (market − realized) by a rolling/historical volatility measure of that gap (as published by BGeometrics).',
        'Fetched daily from the free on-chain API.',
      ],
      meaning:
        'High positive Z = market cap unusually far above realized (overheated). Negative Z = market cap depressed vs realized (capitulation-leaning). Often used to spot cycle extremes more clearly than raw MVRV.',
      howToRead: [
        'Line chart of Z vs time.',
        'Extreme highs historically near cycle tops; deep negatives near cycle bottoms.',
        'Use thresholds as soft bands, not hard triggers — they evolve with sample.',
      ],
      caveats:
        'Exact z-score windowing differs by vendor. Free sample length limits multi-cycle comparison on this page.',
    },
  },
  {
    id: 'nupl',
    label: 'NUPL',
    group: 'onchain',
    groupLabel: 'On-chain',
    blurb:
      'Net Unrealized Profit/Loss — aggregate paper gains vs market cap.',
    explainer: {
      what: 'Measures the network’s unrealized profit or loss as a fraction of market cap.',
      construction: [
        'Related to MVRV: NUPL ≈ 1 − 1/MVRV (when MVRV is well-defined), i.e. (market − realized) / market.',
        'Positive NUPL = aggregate unrealized profit; negative = aggregate unrealized loss.',
        'Sourced from BGeometrics free daily series.',
      ],
      meaning:
        'High NUPL means most coins would realize large gains if sold — euphoria / distribution risk. Low or negative NUPL means many holders are underwater — historically better long-term entry regimes, with painful drawdowns first.',
      howToRead: [
        'Line on roughly [−1, 1] territory depending on cycle.',
        'Color-band folklore (greed/fear zones) varies by author; focus on relative peaks and troughs.',
        'Align peaks with PLO reds / Cowen-style highs for confluence.',
      ],
      caveats:
        'Does not capture leverage, ETFs, or derivatives positioning. Free history window is shorter than full Bitcoin lifetime.',
    },
  },
];

export function viewById(id) {
  return VIEWS.find((v) => v.id === id) || VIEWS[0];
}

export function viewsForData(data) {
  const onchainOk = Boolean(data?.onchain?.available);
  return VIEWS.filter((v) => v.group !== 'onchain' || onchainOk);
}
