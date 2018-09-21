import {
  createRssThunk,
} from '../Actions/Creators/createRssThunk';
import {
  FeedDetailLevels,
} from '../Enums/FeedDetailLevels';
import {
  IRssAction,
} from '../Actions/App/IRssAction';
import {
  IRssFeed,
} from '../Interfaces/IRssFeed';
import {
  isNode,
} from '../Functions/isNode';
import {
  ConnectedLatestPodcasts,
} from '../Components/LatestPodcasts';
import {
  pickFeed,
} from '../Functions/pickFeed';
import {
  PodcastSubscriptionWidget,
} from '../Components/PodcastSubscriptionWidget';
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
    } = pickFeed({
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
    } = pickFeed({
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
        children = [
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
        ];
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
            <PodcastSubscriptionWidget />
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