import React from 'react';
import PropTypes from 'prop-types';

const TagPills = ({ tags, max }) => {
  const list = (Array.isArray(tags) ? tags : []).slice(0, max);
  if (!list.length) return null;
  return (
    <div className="feed-tags" aria-label="Tags">
      {list.map((tag) => (
        <span className="feed-tag" key={tag}>
          {tag}
        </span>
      ))}
    </div>
  );
};

TagPills.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
  max: PropTypes.number,
};

TagPills.defaultProps = {
  tags: [],
  max: 4,
};

export default TagPills;
