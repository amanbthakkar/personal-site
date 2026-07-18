import React from 'react';
import PropTypes from 'prop-types';

import { viewsForData } from './viewCopy';

const GROUPS = [
  { id: 'power', title: 'Power law' },
  { id: 'other', title: 'Classic' },
  { id: 'onchain', title: 'On-chain' },
];

function ViewToggle({ activeId, onChange, data }) {
  const views = viewsForData(data);

  return (
    <div className='indicator-toggles'>
      {GROUPS.map((group) => {
        const groupViews = views.filter((v) => v.group === group.id);
        if (!groupViews.length) return null;
        return (
          <div key={group.id} className='indicator-toggle-section'>
            <div className='indicator-toggle-heading'>{group.title}</div>
            <div
              className='indicator-toggle-grid'
              role='tablist'
              aria-label={group.title}
            >
              {groupViews.map((v) => {
                const active = activeId === v.id;
                return (
                  <button
                    key={v.id}
                    type='button'
                    role='tab'
                    aria-selected={active}
                    className={`indicator-toggle-btn${active ? ' is-active' : ''}`}
                    onClick={() => onChange(v.id)}
                  >
                    {v.label}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

ViewToggle.propTypes = {
  activeId: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  data: PropTypes.object,
};

ViewToggle.defaultProps = {
  data: null,
};

export default ViewToggle;
