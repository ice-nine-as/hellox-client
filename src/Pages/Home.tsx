import {
  AboutLinkAction,
} from '../Actions/Link/AboutLinkAction';
import {
  createLinkAction,
} from '../Actions/Creators/createLinkAction';
import {
  createRssThunk,
} from '../Actions/Creators/createRssThunk';
import {
  ExternalPageUrls,
} from '../Enums/ExternalPageUrls';
import {
  FeedDetailLevels,
} from '../Enums/FeedDetailLevels';
import {
  FeedKeys,
} from '../Enums/FeedKeys';
import {
  IPodcastPost,
} from '../Interfaces/IPodcastPost';
import {
  isNode,
} from '../Functions/isNode';
import {
  ConnectedLatestForumTopics,
} from '../Components/LatestForumTopics';
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
  pickFeed,
} from '../Functions/pickFeed';
import {
  PodcastIcon,
} from '../Components/Icon/PodcastIcon';
import {
  PodcastsLinkAction,
} from '../Actions/Link/PodcastsLinkAction';
import {
  ConnectedQuoteDisplay,
} from '../Components/QuoteDisplay';
import {
  connect,
} from 'react-redux';
import {
  ReadDiscussIcon,
} from '../Components/Icon/ReadDiscussIcon';
import {
  NavLink,
} from 'redux-first-router-link';
import {
  THomePageProps,
} from '../TypeAliases/THomePageProps';
import {
  TPageProps,
} from '../TypeAliases/TPageProps';
import {
  WriteLinkAction,
} from '../Actions/Link/WriteLinkAction';
import {
  WriteIcon,
} from '../Components/Icon/WriteIcon';

import * as React from 'react';
const LazyLoad = require('react-lazy-load').default;

// @ts-ignore
import _styles from '../Styles/Pages/Home.less';
import { PodcastLinkAction } from '../Actions/Link/PodcastLinkAction';
import { PodcastSubscriptionLinks } from '../Components/PodcastSubscriptionLinks';
const styles = _styles || {};

export class Home extends React.PureComponent<TPageProps & THomePageProps> {
  doLoad() {
    const {
      feeds,
      language,
      loadPodcasts,
    } = this.props;

    const {
      feed,
    } = pickFeed({
      type: 'podcast',
      feeds,
      language,
    });

    if (!feed || !feed.items || !feed.items.length) {
      loadPodcasts();
    }
  }

  componentDidMount() {
    if (!isNode()) {
      this.doLoad();
    }
  }

  render() {
    const {
      feeds,
    } = this.props;

    const podcastFeed = feeds.Podcast;
    
    const forumPlaceholder = (
      <div className={styles.BeforeForumPostsLoaded}>
        Forum posts are loading...
      </div>
    );

    const newsPlaceholder = (
      <div className={styles.BeforeNewsLoaded}>
        News is loading...
      </div>
    );

    const latestPodcast =
      podcastFeed &&
      Array.isArray(podcastFeed.items) &&
      podcastFeed.items[0] &&
      podcastFeed.items[0].guid ?
        <NavLink
          className={`${styles.Link} ${styles.SinglePodcastLink}`}
          to={createLinkAction(PodcastLinkAction, {
            id: podcastFeed.items[0].guid.split('/').filter((aa) => aa).slice(-1)[0],
          })}
        >
          <h2 className={`${styles.LinkTitle} ${styles.Podcast}`}>
            PODCAST #{(podcastFeed.items[0] as IPodcastPost)['itunes:episode']['#']}
          </h2>

          <h3 className={`${styles.LinkSubtitle} ${styles.Podcast}`}>
            {(podcastFeed.items[0] as IPodcastPost).title}
          </h3>
          
          <PodcastIcon dontLazyLoad={true} />
        </NavLink> :
        <div className={`${styles.Link} ${styles.SinglePodcastLink} ${styles.UntilLoaded}`}>
          <h2 className={`${styles.LinkTitle} ${styles.Podcast}`}>
            PODCAST #-
          </h2>

          <h3 className={`${styles.LinkSubtitle} ${styles.Podcast}`}>
            -
          </h3>
          
          <PodcastIcon dontLazyLoad={true} />
        </div>;

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

            <div className={`${styles.LinkBox} ${styles.Podcast2}`}>
              {latestPodcast}

              <div className={styles.LinkContainer}>
                <NavLink
                  className={styles.Link}
                  to={createLinkAction(PodcastsLinkAction)}
                >
                  <h3 className={`${styles.LinkSubtitle} ${styles.MorePodcasts}`}>
                    More podcasts
                  </h3>
                </NavLink>
              </div>
            </div>

            <a
              className={`${styles.Link} ${styles.Read}`}
              href={ExternalPageUrls.Forum}
            >
              <div className={`${styles.LinkBox} ${styles.Read}`}>
                <h2 className={`${styles.LinkTitle} ${styles.Read}`}>
                  MEET
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

          <div className={`${styles.LinkBox} ${styles.Podcast}`}>
            {latestPodcast}

            <div className={styles.LinkContainer}>
              <NavLink
                className={styles.Link}
                to={createLinkAction(PodcastsLinkAction)}
              >
                <h3 className={`${styles.LinkSubtitle} ${styles.MorePodcasts}`}>
                  More podcasts
                </h3>
              </NavLink>
            </div>
          </div>
        </section>

        <section className={`${styles.Section} ${styles.Second} light`}>
          <div className={styles.PodcastSubscriptionWrapper}>
            <PodcastSubscriptionLinks />
          </div>

          <div className={styles.ContentWrapper}>
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

            <ConnectedQuoteDisplay />
          </div>
        </section>

        <section className={`${styles.Section} ${styles.Third}`}>
          <h2 className={styles.ForumTopicsTitle}>
            Latest forum topics
          </h2>

          <div className={styles.ForumTopicsWrapper}>
            <LazyLoad
              offset={240}
              placeholder={forumPlaceholder}
              throttle={50}
            >
              <ConnectedLatestForumTopics />
            </LazyLoad>
          </div>

          <h2 className={styles.LatestNewsTitle}>
            What's up?
          </h2>

          <div className={styles.NewsWrapper}>
            <LazyLoad
              offset={240}
              placeholder={newsPlaceholder}
              throttle={50}
            >
              <ConnectedLatestNews detailLevel={FeedDetailLevels.Teaser} />
            </LazyLoad>
          </div>
        </section>
      </article>
    );
  }
}

export const mapStateToProps = ({
  feeds,
  language,
}: THomePageProps,
ownProps: TPageProps) =>
({
  ...ownProps,
  feeds,
  language,
});

export const mapDispatchToProps = (dispatch: Function) => ({
  loadPodcasts() {
    const thunk = createRssThunk({
      /* TODO: change to canonical, language-aware getFeed form. */
      feedKey: FeedKeys.Podcast,
    });

    return dispatch(thunk);
  }
});

export const ConnectedHome = connect(mapStateToProps, mapDispatchToProps)(Home);

export default ConnectedHome;
