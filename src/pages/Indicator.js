import React, { useState, useEffect } from 'react';
import { Container, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Main from '../layouts/Main';
import Header from '../components/Header/Header';
import Cell from '../components/Projects/Cell';
import data from '../data/projects';

import '../App.css';

function Indicator() {
  const [visitorCount, setVisitorCount] = useState('Loading...');

  const [showInfo, setShowInfo] = useState(false);

  const handleMouseEnter = () => {
    setShowInfo(true);
  };

  const handleMouseLeave = () => {
    setShowInfo(false);
  };

  useEffect(() => {
    async function getVisitorCount() {
      const hasCookie = document.cookie.includes('lastVisited');

      if (hasCookie) {
        const response = await fetch(
          `https://cloud.amanthakkar.com/api/old-visitor`
        );
        const data = await response.json();
        setVisitorCount(data.count);
      } else {
        // grab the source from the url, if any
        const urlParams = new URLSearchParams(window.location.search);
        const sourceParam = urlParams.get('source');

        const response = await fetch(
          `https://cloud.amanthakkar.com/api/new-visitor/?source=${sourceParam}`
        );
        const data = await response.json();
        setVisitorCount(data.count);
      }

      const expirationTime = new Date();
      expirationTime.setTime(expirationTime.getTime() + 3 * 60 * 1000); // 3 minutes
      document.cookie = `lastVisited=true; expires=${expirationTime.toUTCString()}`;
    }
    getVisitorCount();
  }, []);

  return (
    <>
      {' '}
      <Header />
      <Main
        title='Bitcoin Indicator'
        description='A little bit about an indicator I created for Bitcoin'
      >
        <div className='paragraph-padding'>
          <article className='post' id='projects'>
            <header>
              <div className='title'>
                <h2>
                  <Link to='/projects'>My Bitcoin Buy/Sell Indicator</Link>
                </h2>
                <p>Is It A Good Time To Buy Bitcoin?</p>
              </div>
            </header>
            <Container>
              <Container>
                <p>
                  <h6>What's this chart?</h6>
                  This chart is based on the Power Law Oscillator model for
                  Bitcoin, to which I made some tweaks in order to make it more
                  accurate based on recent price action. I have written an
                  in-depth explanation about the model and how it works, and how
                  you could code it yourself. If you're interested in diving
                  deeper,{' '}
                  <a
                    href='https://medium.com/datadriveninvestor/bitcoins-power-law-oscillator-the-code-a-summary-and-a-suggested-improvement-b78b59a2bc9c'
                    target='_blank'
                    // rel='noopener noreferrer'
                  >
                    give it a read!
                  </a>
                </p>
                <p className='update-text '>
                  This image is updated every day at midnight UTC.
                </p>{' '}
                <div style={{ maxWidth: '100%', overflow: 'auto' }}>
                  <Image
                    style={{
                      maxWidth: '100%',
                      minWidth: '500px',
                      paddingBlock: '10px',
                    }}
                    src='https://pythonbtcscript.s3.us-west-1.amazonaws.com/indicator.png?timestamp=${new Date().getTime()}'
                    alt='Bitcoin Indicator'
                    fluid
                  />
                </div>
              </Container>
              <Container>
                <p>
                  <h6 className='mb-3'>How should you interpret this?</h6>
                  The oscillator (a value that lies between -1 and 1) can be
                  used as a tool that helps us understand if Bitcoin's price is
                  too high or too low compared to its historical patterns. Think
                  of it like a gauge. It looks at Bitcoin's current price and
                  compares it to where it's expected to be "on average" based on
                  past data. When the gauge is in the red zone, it might mean
                  Bitcoin is getting overvalued, and selling could be a good
                  idea. But when it's in the blue zone, it might be a good time
                  to buy because Bitcoin could be undervalued.{' '}
                </p>
                <p>
                  The plot above is a scatterplot of Bitcoin's price color-coded
                  on which percentile the oscillator value belongs to at any
                  given point in time (you may want to read the article linked
                  above). Blue regions are closer to the 10th percentile, while
                  red regions are closer to the 90th percentile.
                </p>
                <p>
                  <h6 className='mb-3'>Too long, didn't read?</h6>
                  <Image
                    src='/public/images/monkey1.jpg'
                    fluid
                    alt='Monkey'
                    style={{ maxWidth: '60%', height: 'auto' }}
                  ></Image>
                </p>

                <p> Pretty simple. Buy when dark blue, sell when dark red.</p>

                <p>
                  It's important to note that the oscillator is not flawless and
                  should not be the sole basis for investment decisions (don't
                  sue me!)
                </p>
              </Container>
            </Container>
          </article>
        </div>
      </Main>
    </>
  );
}

export default Indicator;
