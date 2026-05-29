import React, { useCallback, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import SourceBadge from './SourceBadge';
import TagPills from './TagPills';
import { youtubeEmbed, youtubeThumb } from './youtube';

const playViaPostMessage = (iframeEl) => {
  if (!iframeEl?.contentWindow) return;
  iframeEl.contentWindow.postMessage(
    JSON.stringify({ event: 'command', func: 'playVideo', args: '' }),
    '*',
  );
};

/**
 * TED-style stacked video inside a collection unit.
 * Preloads the YouTube iframe under a thumbnail facade so click → full native
 * player without a long black flash.
 */
const FeedVideoCard = ({ item, relatedBelow }) => {
  const [active, setActive] = useState(false);
  const iframeRef = useRef(null);
  const thumbs = useMemo(() => youtubeThumb(item.url), [item.url]);
  const embedUrl = useMemo(() => youtubeEmbed(item.url), [item.url]);

  const activate = useCallback(() => {
    setActive(true);
    // iframe is already loading underneath; nudge playback when ready
    requestAnimationFrame(() => playViaPostMessage(iframeRef.current));
    setTimeout(() => playViaPostMessage(iframeRef.current), 400);
  }, []);

  const onThumbError = (e) => {
    if (thumbs?.fallback && e.currentTarget.src !== thumbs.fallback) {
      e.currentTarget.src = thumbs.fallback;
    }
  };

  return (
    <section className="feed-collection" aria-label={item.title}>
      <div className="feed-video">
        <div className="feed-video__top">
          <SourceBadge type={item.type} source={item.source} />
          {item.url ? (
            <a
              className="feed-video__open"
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open on YouTube
            </a>
          ) : null}
        </div>

        <div className="feed-video__stage">
          {embedUrl ? (
            <iframe
              ref={iframeRef}
              className={`feed-video__iframe${active ? ' is-active' : ''}`}
              src={embedUrl}
              title={item.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <div className="feed-video__missing">Missing YouTube id</div>
          )}

          {!active && embedUrl ? (
            <button
              type="button"
              className="feed-video__facade"
              onClick={activate}
              aria-label={`Play ${item.title}`}
            >
              {thumbs ? (
                <img
                  className="feed-video__thumb"
                  src={thumbs.primary}
                  alt=""
                  onError={onThumbError}
                />
              ) : (
                <span className="feed-video__thumbPlaceholder">Play video</span>
              )}
              <span className="feed-video__play" aria-hidden="true">
                ▶
              </span>
            </button>
          ) : null}
        </div>

        <div className="feed-video__meta">
          <h3 className="feed-video__title">{item.title}</h3>
          <p className="feed-video__summary">{item.summary}</p>
          <TagPills tags={item.tags} max={5} />
        </div>
      </div>

      {relatedBelow ? (
        <div className="feed-collection__related">{relatedBelow}</div>
      ) : null}
    </section>
  );
};

FeedVideoCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string,
    title: PropTypes.string.isRequired,
    summary: PropTypes.string,
    source: PropTypes.string,
    url: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  relatedBelow: PropTypes.node,
};

FeedVideoCard.defaultProps = {
  relatedBelow: null,
};

export default FeedVideoCard;
