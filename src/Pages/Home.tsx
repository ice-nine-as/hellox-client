import {
  AboutLinkAction,
} from '../Actions/Link/AboutLinkAction';
import {
  createLinkAction,
} from '../Actions/Creators/createLinkAction';
import {
  ExternalPageUrls,
} from '../Enums/ExternalPageUrls';
import {
  FeedDetailLevels,
} from '../Enums/FeedDetailLevels';
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
  NavLink,
} from 'redux-first-router-link';
import {
  PodcastIcon,
} from '../Components/Icon/PodcastIcon';
import {
  PodcastsLinkAction,
} from '../Actions/Link/PodcastsLinkAction';
import {
  QuoteIcon,
} from '../Components/Icon/QuoteIcon';
import {
  connect,
} from 'react-redux';
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
      <article className={`${_styles.Home} ${_styles.Page}`}>
        <section className={`${_styles.Section} ${_styles.First}`}>
          <div className={_styles.LogoContainer}>
            <Logo state={LogoStates.Normal} />
          </div>

          <h1 className={`${_styles.Header} light`}>
            Imagine the lives of the future
          </h1>

          <div className={_styles.AllLinksContainer}>
            <NavLink
              className={`${_styles.Link} ${_styles.Podcast}`}
              to={createLinkAction(PodcastsLinkAction)}
            >
              <div className={`${_styles.LinkBox} ${_styles.Podcast}`}>
                <h2 className={`${_styles.LinkTitle} ${_styles.Podcast}`}>
                  PODCAST #{3 /* TODO: scrape from wherever podcast data lives.  */}
                </h2>

                <h3 className={`${_styles.LinkSubtitle} ${_styles.Podcast}`}>
                  Add your vision {/* TODO: scrape from wherever podcast data lives. */}
                </h3>

                <div className={_styles.LinkContainer}>
                  <PodcastIcon />

                  <h3 className={`${_styles.LinkSubtitle} ${_styles.MorePodcasts}`}>
                    More podcasts
                  </h3>
                </div>
              </div>
            </NavLink>
            <NavLink
              className={`${_styles.Link} ${_styles.Write}`}
              to={createLinkAction(WriteLinkAction)}
            >
              <div className={`${_styles.LinkBox} ${_styles.Write}`}>
                <h2 className={`${styles.LinkTitle} ${_styles.Write}`}>
                  WRITE
                </h2>
                <h3 className={`${_styles.LinkSubtitle} ${_styles.Write}`}>
                  Add your vision
                </h3>
                <div className={_styles.LinkContainer}>
                  <WriteIcon />
                </div>
              </div>
            </NavLink>
            <NavLink
              className={`${_styles.Link} ${_styles.Podcast2}`}
              to={createLinkAction(PodcastsLinkAction)}
            >
              <div className={`${_styles.LinkBox} ${_styles.Podcast}`}>
                <h2 className={`${_styles.LinkTitle} ${_styles.Podcast}`}>
                  PODCAST #{3 /* TODO: scrape from wherever podcast data lives.  */}
                </h2>

                <h3 className={`${_styles.LinkSubtitle} ${_styles.Podcast}`}>
                  Add your vision {/* TODO: scrape from wherever podcast data lives. */}
                </h3>

                <div className={_styles.LinkContainer}>
                  <PodcastIcon />

                  <h3 className={`${_styles.LinkSubtitle} ${_styles.MorePodcasts}`}>
                    More podcasts
                  </h3>
                </div>
              </div>
            </NavLink>
            <a
              className={`${_styles.Link} ${_styles.Read}`}
              href={ExternalPageUrls.Forum}
            >
              <div className={`${_styles.LinkBox} ${_styles.Read}`}>
                <h2 className={`${styles.LinkTitle} ${_styles.Read}`}>
                  READ
                </h2>

                <h3 className={`${_styles.LinkSubtitle} ${_styles.Read}`}>
                  Discuss
                </h3>

                <div className={_styles.LinkContainer}>
                  <ReadDiscussIcon />
                </div>
              </div>
            </a>
          </div>
        </section>
        <section className={`${_styles.Section} ${_styles.Second}`}>
          <p className={_styles.ExplainerParagraph}>
            hello X is a story laboratory where you can collaborate with
            artists, scientists, and kids to create stories about X, a woman
            living in the Arctic in 2068. The key question of this story
            cycle asks how the food of tomorrow may be shaped by our habits and
            choices today.
          </p>

          <div className={`${_styles.LinkContainer} ${_styles.About}`}>
            <NavLink
              className={`${_styles.Link} ${_styles.About}`}
              to={createLinkAction(AboutLinkAction)}
            >
              <span className={`${_styles.LinkText}`}>
                READ MORE
              </span>
            </NavLink>
          </div>

          <div className={_styles.QuoteContainer}>
            <div className={_styles.QuoteIconContainer}>
              <QuoteIcon />
            </div>

            <span className={`${_styles.Quote} light`}>
              What is the loop of Creation? How is there something from
              nothing?
            </span>
          </div>
        </section>

        <section className={`${_styles.Section} ${_styles.Third}`}>
          <h2 className={`${_styles.LatestNewsTitle} light`}>
            What's up?
          </h2>
          <div className={`${_styles.NewsWrapper}`}>
            <LazyLoad offset={500}>
              <ConnectedLatestNews detailLevel={FeedDetailLevels.Teaser} />
            </LazyLoad>
          </div>
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