/**
 * Map each indicator's latest reading to a score in [-2, +2].
 * Negative = buy-leaning, positive = sell-leaning.
 */

function clip(x, lo = -2, hi = 2) {
  return Math.max(lo, Math.min(hi, x));
}

/** 0–1 risk gauges: 0 cheap → 1 expensive */
function fromRisk01(v) {
  if (v === null || v === undefined || Number.isNaN(Number(v))) return null;
  return clip((Number(v) - 0.5) * 4);
}

function labelForScore(avg) {
  if (avg <= -1.2) return 'Strong buy';
  if (avg <= -0.4) return 'Buy';
  if (avg < 0.4) return 'Hold';
  if (avg < 1.2) return 'Sell';
  return 'Strong sell';
}

function toneForLabel(label) {
  if (label === 'Strong buy') return 'strong-buy';
  if (label === 'Buy') return 'buy';
  if (label === 'Hold') return 'hold';
  if (label === 'Sell') return 'sell';
  return 'strong-sell';
}

function voteLabel(score) {
  if (score === null) return 'n/a';
  if (score <= -1.2) return 'Strong buy';
  if (score <= -0.4) return 'Buy';
  if (score < 0.4) return 'Hold';
  if (score < 1.2) return 'Sell';
  return 'Strong sell';
}

/**
 * @param {object} latest - indicators.json latest block
 * @param {{ available?: boolean }} [onchain]
 */
export function computeCompositeSignal(latest, onchain = {}) {
  if (!latest) return null;

  const votes = [];

  const push = (id, name, score, detail) => {
    if (score === null || Number.isNaN(score)) return;
    votes.push({
      id,
      name,
      score: Math.round(score * 100) / 100,
      vote: voteLabel(score),
      detail,
    });
  };

  push(
    'plo_rank',
    'PLO rank',
    fromRisk01(latest.plo_rank),
    `rank ${Number(latest.plo_rank).toFixed(2)}`,
  );
  push(
    'plo_risk_sigma',
    'σ-risk',
    fromRisk01(latest.plo_risk_sigma),
    `${Number(latest.plo_risk_sigma).toFixed(2)}`,
  );
  push(
    'ma_stretch',
    'MA stretch',
    fromRisk01(latest.cowen_style_v2),
    `${Number(latest.cowen_style_v2).toFixed(2)}`,
  );

  if (latest.plo_residual !== null && latest.plo_residual !== undefined) {
    // Historic tops often ~0.8–0.9 log10 residual
    push(
      'plo_residual',
      'PLO residual',
      clip((Number(latest.plo_residual) / 0.85) * 2),
      `${Number(latest.plo_residual).toFixed(2)}`,
    );
  }

  if (latest.plo_decile !== null && latest.plo_decile !== undefined) {
    push(
      'plo_decile',
      'PLO decile',
      clip(((Number(latest.plo_decile) - 5.5) / 4.5) * 2),
      `band ${latest.plo_decile}`,
    );
  }

  if (latest.mayer !== null && latest.mayer !== undefined) {
    // ~1.2 neutral-ish; 2.4 historically “expensive” filter; high multiples = sell
    push(
      'mayer',
      'Mayer',
      clip((Number(latest.mayer) - 1.2) / 0.9),
      `${Number(latest.mayer).toFixed(2)}×`,
    );
  }

  if (
    latest.pi_cycle_111 !== null
    && latest.pi_cycle_350x2 !== null
    && latest.pi_cycle_350x2 > 0
  ) {
    const ratio = Number(latest.pi_cycle_111) / Number(latest.pi_cycle_350x2);
    // Cross (ratio ≥ 1) is the classic top warning → sell
    push(
      'pi_cycle',
      'Pi Cycle',
      clip((ratio - 0.85) / 0.15),
      `111 / (2×350) = ${ratio.toFixed(2)}`,
    );
  }

  if (latest.price && latest.fair_value) {
    const prem = Number(latest.price) / Number(latest.fair_value) - 1;
    push(
      'corridor',
      'Corridor',
      clip(prem / 0.35),
      `price ${prem >= 0 ? '+' : ''}${(prem * 100).toFixed(0)}% vs fair value`,
    );
  }

  if (onchain?.available) {
    if (latest.mvrv !== null && latest.mvrv !== undefined) {
      push(
        'mvrv',
        'MVRV',
        clip((Number(latest.mvrv) - 1.4) / 0.9),
        `${Number(latest.mvrv).toFixed(2)}`,
      );
    }
    if (latest.mvrv_z !== null && latest.mvrv_z !== undefined) {
      push(
        'mvrv_z',
        'MVRV Z',
        clip(Number(latest.mvrv_z) / 1.5),
        `${Number(latest.mvrv_z).toFixed(2)}`,
      );
    }
    if (latest.nupl !== null && latest.nupl !== undefined) {
      push(
        'nupl',
        'NUPL',
        clip((Number(latest.nupl) - 0.25) / 0.35),
        `${Number(latest.nupl).toFixed(2)}`,
      );
    }
  }

  if (!votes.length) return null;

  const avg = votes.reduce((s, v) => s + v.score, 0) / votes.length;
  const label = labelForScore(avg);
  const buyish = votes.filter((v) => v.score <= -0.4).length;
  const sellish = votes.filter((v) => v.score >= 0.4).length;
  const neutral = votes.length - buyish - sellish;

  return {
    label,
    tone: toneForLabel(label),
    score: Math.round(avg * 100) / 100,
    votes,
    summary: `${buyish} buy-leaning · ${neutral} neutral · ${sellish} sell-leaning (of ${votes.length})`,
  };
}
