import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import Main from '../layouts/Main';
import Header from '../components/Header/Header';

import { discoverRows, discoverStack } from '../data/feed';
import FeedCarousel from '../components/Feed/FeedCarousel';
import FeedVideoCard from '../components/Feed/FeedVideoCard';
import FeedCard from '../components/Feed/FeedCard';

const FEED_BUILD = '20260528-v5';

const Feed = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(t);
  }, []);

  const rows = useMemo(() => discoverRows, []);
  const stack = useMemo(() => discoverStack, []);

  const firstRelated = rows[0];
  const secondRelated = rows[1];

  const videoItems = stack.filter((i) => i.type === 'youtube').slice(0, 2);
  const blogItems = stack.filter((i) => i.type !== 'youtube');

  return (
    <>
      <Header />
      <Main
        title="Discover"
        description="Cross-platform discovery — an ambient research environment."
      >
        <article className="post feed" id="feed">
          <header>
            <div className="title">
              <h2>
                <Link to="/feed">Discover</Link>
              </h2>
              <p>
                High-signal, cross-platform browsing — calm, editorial, relationship-aware (eventually).
              </p>
              <p className="feed-build" aria-hidden="true">
                build {FEED_BUILD}
              </p>
            </div>
          </header>

          {loading ? (
            <div className="feed-loading">Loading…</div>
          ) : (
            <>
              {videoItems.map((v, idx) => (
                <FeedVideoCard
                  key={v.id}
                  item={v}
                  relatedBelow={
                    idx === 0 && firstRelated ? (
                      <FeedCarousel
                        title={firstRelated.title}
                        subtitle={firstRelated.subtitle}
                        items={firstRelated.items}
                        embedded
                      />
                    ) : idx === 1 && secondRelated ? (
                      <FeedCarousel
                        title={secondRelated.title}
                        subtitle={secondRelated.subtitle}
                        items={secondRelated.items}
                        embedded
                      />
                    ) : null
                  }
                />
              ))}

              {blogItems.map((b) => (
                <div className="feed-blogBlock" key={b.id}>
                  <div className="feed-blogHeader">From essays</div>
                  <FeedCard item={b} />
                </div>
              ))}

              {rows.slice(2).map((row) => (
                <FeedCarousel
                  key={row.id}
                  title={row.title}
                  subtitle={row.subtitle}
                  items={row.items}
                />
              ))}
            </>
          )}
        </article>
      </Main>
    </>
  );
};

export default Feed;
