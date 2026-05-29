import React from 'react';
import PropTypes from 'prop-types';

const typeLabel = (type) => {
  switch (type) {
    case 'youtube':
      return 'YouTube';
    case 'blog':
      return 'Blog';
    case 'paper':
      return 'Paper';
    case 'podcast':
      return 'Podcast';
    case 'rss':
      return 'RSS';
    case 'post':
      return 'Note';
    default:
      return type || 'Item';
  }
};

const SourceBadge = ({ type, source }) => (
  <span className={`feed-badge feed-badge--${type || 'item'}`}>
    {typeLabel(type)}
    {source ? <span className="feed-badge__source"> · {source}</span> : null}
  </span>
);

SourceBadge.propTypes = {
  type: PropTypes.string,
  source: PropTypes.string,
};

SourceBadge.defaultProps = {
  type: 'item',
  source: null,
};

export default SourceBadge;
