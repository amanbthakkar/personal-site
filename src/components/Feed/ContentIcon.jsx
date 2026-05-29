import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';

const iconForType = (type) => {
  if (type === 'youtube') return faYoutube;
  return null;
};

const ContentIcon = ({ type }) => {
  const icon = iconForType(type);
  return (
    <span className={`feed-icon feed-icon--${type || 'item'}`} aria-hidden="true">
      {icon ? (
        <FontAwesomeIcon icon={icon} />
      ) : (
        <span className="feed-icon__fallback">{String(type || '•').slice(0, 1).toUpperCase()}</span>
      )}
    </span>
  );
};

ContentIcon.propTypes = {
  type: PropTypes.string,
};

ContentIcon.defaultProps = {
  type: 'item',
};

export default ContentIcon;
