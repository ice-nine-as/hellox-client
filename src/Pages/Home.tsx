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

// @ts-ignore
import _styles from '../Styles/Pages/Home.less';
import { TPageProps } from '../TypeAliases/TPageProps';
import { IPodcastPost } from '../Interfaces/IPodcastPost';
const styles = _styles || {};

export class Home extends React.PureComponent<TPageProps & THomePageProps> {
  render() {
    return (
      <article className={`${styles.Home} ${styles.Page}`}>
        <section className={`${styles.Section} ${styles.First} light`}>
          <div className={styles.LogoContainer}>
            <Logo state={LogoStates.Normal} />
          </div>

          <h1 className={`${styles.Header} light`}>
            Imagine the lives of the future
          </h1>

          <div className={styles.AllLinksContainer}>
            <NavLink
              className={`${styles.Link} ${styles.Podcast}`}
              to={createLinkAction(PodcastsLinkAction)}
            >
              <div className={`${styles.LinkBox} ${styles.Podcast}`}>
                <h2 className={`${styles.LinkTitle} ${styles.Podcast}`}>
                  PODCAST #{
                      this.props.feeds.Podcast ?
                        (this.props.feeds.Podcast.items.slice(-1)[0] as IPodcastPost)['itunes:episode']['#'] :
                        '-'
                    }
                </h2>

                <h3 className={`${styles.LinkSubtitle} ${styles.Podcast}`}>
                  {
                    this.props.feeds.Podcast ?
                      (this.props.feeds.Podcast.items.slice(-1)[0] as IPodcastPost).title || '-' :
                      '-'
                  }
                </h3>

                <div className={styles.LinkContainer}>
                  <PodcastIcon dontLazyLoad={true} />

                  <h3 className={`${styles.LinkSubtitle} ${styles.MorePodcasts}`}>
                    More podcasts
                  </h3>
                </div>
              </div>
            </NavLink>

            <NavLink
              className={`${styles.Link} ${styles.Write}`}
              to={createLinkAction(WriteLinkAction)}
            >
              <div className={`${styles.LinkBox} ${styles.Write}`}>
                <h2 className={`${styles.LinkTitle} ${styles.Write}`}>
                  WRITE
                </h2>
                <h3 className={`${styles.LinkSubtitle} ${styles.Write}`}>
                  Add your vision
                </h3>
                <div className={styles.LinkContainer}>
                  <WriteIcon dontLazyLoad={true} />
                </div>
              </div>
            </NavLink>

            <NavLink
              className={`${styles.Link} ${styles.Podcast2}`}
              to={createLinkAction(PodcastsLinkAction)}
            >
              <div className={`${styles.LinkBox} ${styles.Podcast}`}>
                <h2 className={`${styles.LinkTitle} ${styles.Podcast}`}>
                  PODCAST #{
                      this.props.feeds.Podcast ?
                        (this.props.feeds.Podcast.items.slice(-1)[0] as IPodcastPost)['itunes:episode']['#'] :
                        '-'
                    }
                </h2>

                <h3 className={`${styles.LinkSubtitle} ${styles.Podcast}`}>
                  {
                    this.props.feeds.Podcast ?
                      (this.props.feeds.Podcast.items.slice(-1)[0] as IPodcastPost).title || '-' :
                      '-'
                  }
                </h3>

                <div className={styles.LinkContainer}>
                  <PodcastIcon dontLazyLoad={true} />

                  <h3 className={`${styles.LinkSubtitle} ${styles.MorePodcasts}`}>
                    More podcasts
                  </h3>
                </div>
              </div>
            </NavLink>

            <a
              className={`${styles.Link} ${styles.Read}`}
              href={ExternalPageUrls.Forum}
            >
              <div className={`${styles.LinkBox} ${styles.Read}`}>
                <h2 className={`${styles.LinkTitle} ${styles.Read}`}>
                  READ
                </h2>

                <h3 className={`${styles.LinkSubtitle} ${styles.Read}`}>
                  Discuss
                </h3>

                <div className={styles.LinkContainer}>
                  <ReadDiscussIcon dontLazyLoad={true} />
                </div>
              </div>
            </a>
          </div>
        </section>

        <section className={`${styles.Section} ${styles.Second} light`}>
          <p className={styles.ExplainerParagraph}>
            hello X is a story laboratory where you can collaborate with
            artists, scientists, and kids to create stories about X, a woman
            living in the Arctic in 2068. The key question of this story
            cycle asks how the food of tomorrow may be shaped by our habits and
            choices today.
          </p>

          <div className={`${styles.LinkContainer} ${styles.About}`}>
            <NavLink
              className={`${styles.Link} ${styles.About}`}
              to={createLinkAction(AboutLinkAction)}
            >
              <span className={`${styles.LinkText}`}>
                READ MORE
              </span>
            </NavLink>
          </div>

          <div className={styles.QuoteContainer}>
            <div className={styles.QuoteIconContainer}>
              <QuoteIcon dontLazyLoad={true} />
            </div>

            <span className={`${styles.Quote} light`}>
              What is the loop of Creation? How is there something from
              nothing?
            </span>
          </div>
        </section>

        <section className={`${styles.Section} ${styles.Third}`}>
          <h2 className={`${styles.LatestNewsTitle} light`}>
            What's up?
          </h2>

          <div className={`${styles.NewsWrapper}`}>
            <ConnectedLatestNews detailLevel={FeedDetailLevels.Teaser} />
          </div>
        </section>
      </article>
    );
  }
}

export const mapStateToProps = ({
  feeds,
}: THomePageProps,
ownProps: TPageProps) =>
({
  ...ownProps,
  feeds,
});

export const ConnectedHome = connect(mapStateToProps)(Home);

export default ConnectedHome;