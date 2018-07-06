import {
  createRssThunk,
} from '../Actions/Creators/createRssThunk';
import {
  FeedDetailLevels,
} from '../Enums/FeedDetailLevels';
import {
  getFeed,
} from '../Modules/getFeed';
import {
  IRssAction,
} from '../Actions/App/IRssAction';
import {
  IRssFeed,
} from '../Interfaces/IRssFeed';
import {
  isNode,
} from '../Modules/isNode';
import {
  ConnectedLatestPodcasts,
} from '../Components/LatestPodcasts';
import {
  connect,
  MapStateToProps,
} from 'react-redux';
import {
  TFeedsMap,
} from '../TypeAliases/TFeedsMap';
import {
  TPageProps
} from '../TypeAliases/TPageProps';
import {
  TPodcastsDispatchProps,
} from '../TypeAliases/TPodcastsDispatchProps';
import {
  TPodcastsStoreProps,
} from '../TypeAliases/TPodcastsStoreProps';
import {
  TStoreProps,
} from '../TypeAliases/TStoreProps';
import {
  VoiceMemoForm,
} from '../Components/VoiceMemoForm';

import * as React from 'react';

// @ts-ignore
import _styles from '../Styles/Pages/Podcasts.less';
const styles = _styles || {};

export const strings = {
  LOAD_ERROR:
    'Sorry, an error was encountered loading the podcasts!',
};

export class Podcasts extends React.Component<TPageProps & TPodcastsStoreProps & TPodcastsDispatchProps, { error: string, }> {
  constructor(props: any, context?: any) {
    super(props, context);

    this.state = {
      error: '',
    };
  }

  /* TODO: Prevent multiple attempts to load the same resource? Set a maximum
   * number of attempts? */
  doLoad() {
    const {
      feeds,
      language,
    } = this.props;

    /* Loads the relevant feed based on language and detail level. */
    const {
      feed,
      key,
    } = getFeed({
      type: 'podcast',
      feeds,
      language,
    });

    if (!feed) {
      this.props.getPodcastFeed(key).then(
        () => {},
        () => this.setState({ error: strings.LOAD_ERROR, }) 
      );
    }
  }

  componentDidMount() {
    /* Don't load within the component on the server. */
    if (!isNode()) {
      this.doLoad();
    }
  }

  render() {
    const {
      feeds,
      language,
    } = this.props;

    const {
      error,
    } = this.state;
    
    const {
      feed,
    } = getFeed({
      type: 'podcast',
      feeds,
      language,
    });
    
    let children: React.ReactNode = null;
    if (error) {
      children = error;
    } else if (!feed) {
      children = <p className={styles.Message}>Podcasts loading...</p>;
    } else if (feed.items) {
      if (feed.items.length) {
        /* TODO: add type guards for podcast posts? */
        children = (
          /* Display the first podcast in full.
          <PodcastItemFull
            item={feed.items[0] as IPodcastPost}
            key="keyOne"
          />,*/

          /* Display previews of all podcasts. */
          <div
            className={styles.Content}
            key="keyThree"
          >
            <ConnectedLatestPodcasts
              detailLevel={FeedDetailLevels.Teaser}
              key="keyTwo"
            />
          </div>
        );
      } else {
        children = <p className={styles.Message}>No podcasts yet. Sorry!</p>;
      }
    } else {
      children = <p className={styles.Message}>Unknown error.</p>;
    }

    return (
      <div className={`${styles.Podcasts} ${styles.Page}`}>
        <h1 className={styles.Title}>
          Podcasts
        </h1>

        <div className={styles.Wrapper}>
          {children}

          <div
            className={styles.SubscribeWrapper}
            key="sub"
          >
            <h3>
              SUBSCRIBE ON
            </h3>
            
            <p>
              <a
                className={styles.SubscribeLink}
                href="https://itunes.apple.com/no/podcast/hello-x/id1380756324&ls=1"
              >
                Apple Podcasts
              </a>

              &bull;
              
              <a
                className={styles.SubscribeLink}
                href="https://www.subscribeonandroid.com/www.blubrry.com/feeds/hello_x.xml"
              >
                Android
              </a>

              &bull;

              <a
                className={styles.SubscribeLink}
                href="https://www.stitcher.com/podcast/ice9/hello-x"
              >
                Stitcher
              </a>
            </p>

            <p>
              {/*Google Play &bull; Spotify &bull; */}
              <a
                className={styles.SubscribeLink}
                href="https://soundcloud.com/hello_x"
              >
                SoundCloud 
              </a>

              &bull;

              <a
                className={styles.SubscribeLink}
                href="https://www.blubrry.com/feeds/hello_x.xml"
              >
                RSS
              </a>
            </p>
          </div>
        </div>

        <VoiceMemoForm />
      </div>
    );
  }
}

export const mapStateToProps: MapStateToProps<TPodcastsStoreProps, TPageProps, TStoreProps> = ({
  feeds,
  language,
  location,
}, ownProps) => ({
  ...ownProps,
  feeds,
  language,
  location,
});

export const mapDispatchToProps = (dispatch: Function) => ({
  getPodcastFeed(
    feedKey: keyof TFeedsMap,
    offset: number = 0,
    composeWith: IRssFeed | null = null
  ): Promise<IRssAction>
  {
    const thunk = createRssThunk({
      composeWith,
      feedKey: feedKey,
      offset: offset || 0,
    });

    return dispatch(thunk);
  },
});

export const ConnectedPodcasts = connect(mapStateToProps, mapDispatchToProps)(Podcasts);

export default ConnectedPodcasts;