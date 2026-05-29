import React from 'react';
import PropTypes from 'prop-types';

import ContentIcon from './ContentIcon';

const FeedCard = ({ item }) => {
  const Wrapper = item.url ? 'a' : 'div';
  const wrapperProps = item.url
    ? { href: item.url, target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <Wrapper className="feed-card feed-card--compact" {...wrapperProps}>
      <div className="feed-card__source">
        <ContentIcon type={item.type} />
        <span className="feed-card__sourceText">{item.source || item.type}</span>
      </div>
      <h3 className="feed-card__title">{item.title}</h3>
      <p className="feed-card__summary">{item.summary}</p>
    </Wrapper>
  );
};

FeedCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string,
    title: PropTypes.string.isRequired,
    summary: PropTypes.string,
    source: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
};

export default FeedCard;
