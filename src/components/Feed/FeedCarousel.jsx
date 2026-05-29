import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import FeedCard from './FeedCard';

const VISIBLE = 3;

const FeedCarousel = ({ title, subtitle, items, embedded }) => {
  const [start, setStart] = useState(0);
  const len = items.length;

  const visible = useMemo(() => {
    if (!len) return [];
    const out = [];
    for (let i = 0; i < Math.min(VISIBLE, len); i += 1) {
      out.push(items[(start + i) % len]);
    }
    return out;
  }, [items, len, start]);

  const prev = () => setStart((s) => (s - 1 + len) % len);
  const next = () => setStart((s) => (s + 1) % len);

  if (!len) return null;

  const canScroll = len > VISIBLE;

  return (
    <section
      className={`feed-row${embedded ? ' feed-row--embedded' : ''}`}
      aria-label={title}
    >
      <header className="feed-row__header">
        <div>
          <h3 className="feed-row__title">{title}</h3>
          {subtitle ? <p className="feed-row__subtitle">{subtitle}</p> : null}
        </div>
      </header>

      <div className="feed-carouselOuter">
        <button
          type="button"
          className="feed-carouselNav feed-carouselNav--left"
          onClick={prev}
          aria-label={`Previous items in ${title}`}
          disabled={!canScroll}
        >
          ‹
        </button>

        <div className="feed-carousel" role="list">
          {visible.map((item) => (
            <div className="feed-carousel__item" role="listitem" key={item.id}>
              <FeedCard item={item} />
            </div>
          ))}
        </div>

        <button
          type="button"
          className="feed-carouselNav feed-carouselNav--right"
          onClick={next}
          aria-label={`Next items in ${title}`}
          disabled={!canScroll}
        >
          ›
        </button>
      </div>
    </section>
  );
};

FeedCarousel.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  embedded: PropTypes.bool,
};

FeedCarousel.defaultProps = {
  subtitle: null,
  embedded: false,
};

export default FeedCarousel;
