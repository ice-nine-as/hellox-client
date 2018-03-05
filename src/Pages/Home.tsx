import {
  AboutLinkAction,
} from '../Actions/Link/AboutLinkAction';
import {
  HomeBackgroundImage,
} from '../Components/HomeBackgroundImage';
import {
  ConnectedLatestNews,
} from '../Components/LatestNews';
import {
  Logo,
} from '../Components/Logo';
import {
  LogoStates,
} from '../Enums/LogoStates';
import {
  makeLinkAction,
} from '../Modules/makeLinkAction';
import {
  NavLink,
} from 'redux-first-router-link';
import {
  PodcastLinkAction,
} from '../Actions/Link/PodcastLinkAction';
import {
  PodcastIcon,
} from '../Components/Icon/PodcastIcon';
import {
  QuoteIcon,
} from '../Components/Icon/QuoteIcon';
import {
  connect,
} from 'react-redux';
import {
  ReadDiscussLinkAction,
} from '../Actions/Link/ReadDiscussLinkAction';
import {
  ReadDiscussIcon,
} from '../Components/Icon/ReadDiscussIcon';
import {
  THomePageProps,
} from '../TypeAliases/THomePageProps';
import {
  WriteLinkAction,
} from '../Actions/Link/WriteLinkAction';
import {
  WriteIcon,
} from '../Components/Icon/WriteIcon';

import * as React from 'react';
const LazyLoad = require('react-lazy-load').default;

// @ts-ignore
import styles from '../Styles/Pages/Home.less';
const _styles = styles || {};

export class Home extends React.PureComponent<THomePageProps> {
  render() {
    return (
      <article className={`${_styles.Home} Page`}>
        <section className={`${_styles.Section} ${_styles.First}`}>
          <HomeBackgroundImage />

          <div className={_styles.LogoContainer}>
            <Logo state={LogoStates.Normal} />
          </div>

          <h1 className={_styles.Header}>
            Imagine the lives of the future
          </h1>

          <div className={_styles.AllLinksContainer}>
            <div className={`${_styles.LinkBox} ${_styles.Write}`}>
              <h2 className={`${styles.LinkTitle} ${_styles.Write}`}>
                WRITE
              </h2>

              <h3 className={`${_styles.LinkSubtitle} ${_styles.Write}`}>
                Add your vision
              </h3>

              <div className={_styles.LinkContainer}>
                <NavLink
                  className={`${_styles.Link} ${_styles.Write}`}
                  to={makeLinkAction(WriteLinkAction)}
                >
                  <WriteIcon />
                </NavLink>
              </div>
            </div>

            <div className={`${_styles.LinkBox} ${_styles.Podcast}`}>
              <h2 className={`${_styles.LinkTitle} ${_styles.Podcast}`}>
                PODCAST
              </h2>

              <h3 className={`${_styles.LinkSubtitle} ${_styles.Podcast}`}>
                #03 Add your vision {/* TODO: scrape from wherever podcast data lives. */}
              </h3>

              <div className={_styles.LinkContainer}>
                <NavLink
                  className={`${_styles.Link} ${_styles.Podcast}`}
                  to={makeLinkAction(PodcastLinkAction)}
                >
                  <PodcastIcon />
                </NavLink>

                <h3 className={`${_styles.LinkSubtitle} ${_styles.MorePodcasts}`}>
                  More podcasts
                </h3>
              </div>
            </div>

            <div className={`${_styles.LinkBox} ${_styles.Read}`}>
              <h2 className={`${styles.LinkTitle} ${_styles.Read}`}>
                READ
              </h2>

              <h3 className={`${_styles.LinkSubtitle} ${_styles.Write}`}>
                Discuss
              </h3>

              <div className={_styles.LinkContainer}>
                <NavLink
                  className={`${_styles.Link} ${_styles.Write}`}
                  to={makeLinkAction(ReadDiscussLinkAction)}
                >
                  <ReadDiscussIcon />
                </NavLink>
              </div>
            </div>
          </div>
        </section>

        <section className={`${_styles.Section} ${_styles.Second}`}>
          <p className={_styles.ExplainerParagraph}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea.
          </p>

          <div className={`${_styles.LinkContainer} ${_styles.About}`}>
            <NavLink
              className={`${_styles.Link} ${_styles.About}`}
              to={makeLinkAction(AboutLinkAction)}
            >
              <span className={_styles.LinkText}>GO TO ABOUT</span>
            </NavLink>
          </div>

          <div className={_styles.QuoteContainer}>
            <div className={_styles.QuoteIconContainer}>
              <QuoteIcon />
            </div>

            <span className={_styles.Quote}>
              What is the loop of Creation? How is there something from
              nothing?
            </span>
          </div>
        </section>

        <section className={`${_styles.Section} ${_styles.Third}`}>
          <h2 className={_styles.LatestNewsTitle}>
            What's up?
          </h2>

          <LazyLoad verticalOffset={300}>
            <ConnectedLatestNews />
          </LazyLoad>
        </section>
      </article>
    );
  }
}

export const mapStateToProps = ({
  page,
}: THomePageProps) => ({
  page,
});

export const ConnectedHome = connect(mapStateToProps)(Home);

export default ConnectedHome;