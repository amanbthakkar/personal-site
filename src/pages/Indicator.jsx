import React, { useEffect, useState } from 'react';
import { Container, Image, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Main from '../layouts/Main';
import Header from '../components/Header/Header';
import MetricsStrip from '../components/Indicator/MetricsStrip';
import ViewToggle from '../components/Indicator/ViewToggle';
import IndicatorChart from '../components/Indicator/IndicatorChart';
import {
  INDICATOR_JSON_URL,
  INDICATOR_PNG_URL,
  viewById,
} from '../components/Indicator/viewCopy';

import '../App.css';
import '../components/Indicator/Indicator.css';

function Indicator() {
  const [viewId, setViewId] = useState('plo_decile');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`${INDICATOR_JSON_URL}?t=${Date.now()}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (!cancelled) {
          setData(json);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Failed to load indicators');
          setData(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const view = viewById(viewId);
  const showPloTldr = view.group === 'power' && viewId !== 'corridor';

  return (
    <>
      <Header />
      <Main
        title='Bitcoin Indicator'
        description='Interactive Bitcoin cycle indicators: power-law oscillator, risk gauges, and classic overlays — updated daily.'
      >
        <div>
          <article className='post' id='projects'>
            <header>
              <div className='title'>
                <h2>
                  <Link to='/power-law-oscillator-indicator'>
                    My Bitcoin Buy/Sell Indicator
                  </Link>
                </h2>
                <p>Is It A Good Time To Buy Bitcoin?</p>
              </div>
            </header>
            <Container>
              <p>
                <h6>What&apos;s this?</h6>
                Interactive charts built from Bitcoin&apos;s daily price history.
                The default view is the Power Law Oscillator (expanding log-log
                residual) with percentile coloring — the model I wrote about on{' '}
                <a
                  href='https://medium.com/datadriveninvestor/bitcoins-power-law-oscillator-the-code-a-summary-and-a-suggested-improvement-b78b59a2bc9c'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Medium
                </a>
                . Toggle other price-based cycle gauges below. Models recompute
                daily around midnight UTC on my homelab.
              </p>

              {loading && (
                <div className='text-center my-4'>
                  <Spinner animation='border' role='status' />
                  <p className='update-text mt-2'>Loading indicator data…</p>
                </div>
              )}

              {!loading && data && (
                <>
                  <MetricsStrip latest={data.latest} />
                  <ViewToggle activeId={viewId} onChange={setViewId} />
                  <IndicatorChart data={data} viewId={viewId} />
                  <p className='update-text'>
                    As of {data.as_of} · updated {data.updated_at} · price-based
                    models only (Cowen-style is an open recreation, not official
                    ITC)
                  </p>
                  <p className='indicator-blurb'>{view.blurb}</p>
                </>
              )}

              {!loading && error && (
                <>
                  <p className='update-text'>
                    Interactive data unavailable ({error}). Showing the daily PNG
                    fallback.
                  </p>
                  <div style={{ maxWidth: '100%', overflow: 'auto' }}>
                    <Image
                      style={{
                        maxWidth: '100%',
                        width: '100%',
                        height: 'auto',
                        paddingBlock: '10px',
                      }}
                      src={`${INDICATOR_PNG_URL}?timestamp=${Date.now()}`}
                      alt='Bitcoin Power Law Oscillator Indicator'
                      fluid
                      loading='lazy'
                    />
                  </div>
                </>
              )}

              {showPloTldr && (
                <>
                  <h6 className='mb-3 mt-4'>Too long, didn&apos;t read?</h6>
                  <Image
                    src='/monkey1.jpg'
                    fluid
                    alt='Monkey illustration representing simple explanation'
                    style={{ maxWidth: '60%', height: 'auto' }}
                    loading='lazy'
                  />
                  <p className='mt-2'>
                    Pretty simple. Buy when dark blue, sell when dark red.
                  </p>
                </>
              )}

              <p className='mt-3'>
                It&apos;s important to note that none of these oscillators are
                flawless and should not be the sole basis for investment
                decisions (don&apos;t sue me!)
              </p>
            </Container>
          </article>
        </div>
      </Main>
    </>
  );
}

export default Indicator;
