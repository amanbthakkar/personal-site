import React from 'react';
import PropTypes from 'prop-types';

function ViewExplainer({ view }) {
  if (!view?.explainer) return null;
  const { what, construction, meaning, howToRead, caveats } = view.explainer;

  return (
    <section className='indicator-explainer' aria-labelledby='indicator-explainer-title'>
      <h6 id='indicator-explainer-title' className='indicator-explainer-title'>
        {view.label}
      </h6>
      <p className='indicator-explainer-lead'>{what}</p>

      <div className='indicator-explainer-grid'>
        <div>
          <h6 className='indicator-explainer-sub'>How it is constructed</h6>
          <ol className='indicator-explainer-list'>
            {construction.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
        <div>
          <h6 className='indicator-explainer-sub'>What it means</h6>
          <p>{meaning}</p>
        </div>
        <div>
          <h6 className='indicator-explainer-sub'>How to read this chart</h6>
          <ul className='indicator-explainer-list'>
            {howToRead.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
        </div>
        <div>
          <h6 className='indicator-explainer-sub'>Caveats</h6>
          <p>{caveats}</p>
        </div>
      </div>
    </section>
  );
}

ViewExplainer.propTypes = {
  view: PropTypes.object,
};

ViewExplainer.defaultProps = {
  view: null,
};

export default ViewExplainer;
