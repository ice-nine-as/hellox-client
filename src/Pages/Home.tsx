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
  IPodcastPost,
} from '../Interfaces/IPodcastPost';
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
  ConnectedQuoteDisplay,
} from '../Components/QuoteDisplay';
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
import { createRssThunk } from '../Actions/Creators/createRssThunk';
import { FeedKeys } from '../Enums/FeedKeys';
import { isNode } from '../Modules/isNode';
const styles = _styles || {};

export class Home extends React.PureComponent<TPageProps & THomePageProps> {
  doLoad() {
    if (!this.props.feeds.Podcast ||
        !this.props.feeds.Podcast.items ||
        !this.props.feeds.Podcast.items.length)
    {
      this.props.loadPodcasts().then(() => {}, () => {});
    }
  }

  componentDidMount() {
    if (!isNode()) {
      this.doLoad();
    }
  }

  render() {
    const newsPlaceholder = (
      <div className={styles.BeforeNewsLoaded}>
        News is loading...
      </div>
    );

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
                      this.props.feeds.Podcast && Array.isArray(this.props.feeds.Podcast.items) ?
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
                    this.props.feeds.Podcast && Array.isArray(this.props.feeds.Podcast.items) ?
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

          <ConnectedQuoteDisplay />
        </section>

        <section className={`${styles.Section} ${styles.Third}`}>
          <h2 className={`${styles.LatestNewsTitle} light`}>
            What's up?
          </h2>

          <div className={`${styles.NewsWrapper}`}>
            <LazyLoad
              offset={240}
              placeholder={newsPlaceholder}
              throttle={50}
            >
              <ConnectedLatestNews detailLevel={FeedDetailLevels.Teaser} />
            </LazyLoad>
          </div>
        </section>

        {/* Mailchimp */}
        {/*<link href="https://cdn-images.mailchimp.com/embedcode/slim-10_7.css" rel="stylesheet" type="text/css" />

        <div
          id="mc_embed_signup"
          style={{
            background: '#fff',
            clear: 'left',
            font: '14px "Lato Regular", "Lato Subset", sans-serif',
          }}
        >
          <form
            action="https://ice-9.us16.list-manage.com/subscribe/post?u=df70196a51c2b6c343aa52c4e&amp;id=74777a8f7e"
            method="post"
            id="mc-embedded-subscribe-form"
            name="mc-embedded-subscribe-form"
            className="validate"
            target="_blank"
            noValidate
            >
            <div id="mc_embed_signup_scroll">
              <label htmlFor="mce-EMAIL">
                Join our newsletter to get monthly updates from us
              </label>
              
              <input
                type="email"
                value=""
                name="EMAIL"
                className="email"
                id="mce-EMAIL"
                placeholder="email address"
                required
              />
              
              <div
                style={{
                  position: 'absolute',
                  left: '-5000px',
                }}
                aria-hidden="true"
              >
                <input type="text" name="b_df70196a51c2b6c343aa52c4e_74777a8f7e" tabIndex={-1} value="" />
              </div>
            
              <div className="clear">
                <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" className="button" />
              </div>
            </div>
          </form>
        </div>*/}
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