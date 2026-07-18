import React from 'react';
import PropTypes from 'prop-types';

import { computeCompositeSignal } from './signalScore';

function CompositeSignal({ latest, onchain }) {
  const signal = computeCompositeSignal(latest, onchain);
  if (!signal) return null;

  return (
    <section className={`indicator-signal tone-${signal.tone}`} aria-live='polite'>
      <div className='indicator-signal-main'>
        <div className='indicator-signal-kicker'>Overall signal</div>
        <div className='indicator-signal-label'>{signal.label}</div>
        <div className='indicator-signal-meta'>
          Aggregate score {signal.score > 0 ? '+' : ''}
          {signal.score}
          {' · '}
          {signal.summary}
        </div>
        <p className='indicator-signal-note'>
          Equal-weight blend of the models below (negative = cheaper / buy-leaning,
          positive = richer / sell-leaning). Heuristic confluence — not advice.
        </p>
      </div>
      <ul className='indicator-signal-votes'>
        {signal.votes.map((v) => (
          <li key={v.id} className={`vote-${v.vote.toLowerCase().replace(/\s+/g, '-')}`}>
            <span className='vote-name'>{v.name}</span>
            <span className='vote-detail'>{v.detail}</span>
            <span className='vote-label'>{v.vote}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

CompositeSignal.propTypes = {
  latest: PropTypes.object,
  onchain: PropTypes.object,
};

CompositeSignal.defaultProps = {
  latest: null,
  onchain: null,
};

export default CompositeSignal;
