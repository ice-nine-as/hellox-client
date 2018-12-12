import {
  composeFeeds,
} from '../Functions/composeFeeds';
import {
  FeedDetailLevels,
} from '../Enums/FeedDetailLevels';
import {
  FeedKeys,
} from '../Enums/FeedKeys';
import {
  IRssPost,
} from '../Interfaces/IRssPost';
import {
  pickFeed,
} from '../Functions/pickFeed';
import {
  createRssThunk,
} from '../Actions/Creators/createRssThunk';
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
  NewsItemFull,
} from './NewsItemFull';
import {
  NewsItemPreview,
} from './NewsItemPreview';
import {
  PodcastItemFull,
} from './PodcastItemFull';
import {
  PodcastItemPreview,
} from './PodcastItemPreview';
import {
  PreviewFeed,
} from './PreviewFeed';
import {
  connect,
  MapStateToProps,
} from 'react-redux';
import {
  TFeedsMap,
} from '../TypeAliases/TFeedsMap';
import {
  TLatestNewsDispatchProps,
} from '../TypeAliases/TLatestNewsDispatchProps';
import {
  TLatestNewsOwnProps,
} from '../TypeAliases/TLatestNewsOwnProps';
import {
  TLatestNewsStoreProps,
} from '../TypeAliases/TLatestNewsStoreProps';
import {
  TStoreProps,
} from '../TypeAliases/TStoreProps';

import * as React from 'react';

// @ts-ignore
import _styles from '../Styles/Components/LatestNews.less';
const styles = _styles || {};

export class LatestNews extends React.Component<TLatestNewsOwnProps & TLatestNewsStoreProps & TLatestNewsDispatchProps, { error: string, }> {
  state = {
    error: '',
  };

  constructor(props: any, context?: any) {
    super(props, context);

    this.doLoad = this.doLoad.bind(this);
  }
  
  /* TODO: Prevent multiple attempts to load the same resource? Set a maximum
   * number of attempts? */
  async doLoad() {
    const {
      detailLevel,
      feeds,
      getNewsFeed,
      getPodcasts,
      language,
    } = this.props;

    if (!feeds[FeedKeys.Podcast]) {
      try {
        await getPodcasts();
      } catch (e) {
        console.error(e);
      }
    }

    /* Loads the relevant feed based on language and detail level. */
    const {
      feed,
      key,
    } = pickFeed({
      type: 'newsItem',
      detailLevel,
      feeds,
      language,
    });

    /* Only autoload if the feed has never been fetched, or there is not a
     * full triple-stack of items already. */
    const rejector = (reason: Error) => {
      console.error(reason);
      this.setState({
        error: 'An error was encountered in loading the news feed. Sorry!',
      });
    };

    /* For some reason, possibly that we're only mutating a portion of a feed,
     * the getNewsFeed method occasionally refuses to render new articles when
     * a single article has been fetched beforehand. This is avoided through
     * forceUpdate below. */
    if (feed) {
      getNewsFeed(key).then(
        /* Resolve */
        () => this.forceUpdate(),
      
        /* Reject */
        (reason) => rejector(reason)
      );
    } else {
      getNewsFeed(key)
        .then(
          /* Resolve */
          () => this.forceUpdate(),

          /* Reject */
          (reason) => rejector(reason)
        );
    }
  }

  componentDidMount() {
    if (!isNode()) {
      const {
        detailLevel,
        feeds,
        language,
      } = this.props;
  
      /* Loads the relevant feed based on language and detail level. */
      const {
        feed,
      } = pickFeed({
        type: 'newsItem',
        detailLevel,
        feeds,
        language,
      });

      /* Only autoload if the feed has never been fetched, or there is not a
       * full triple-stack of items already. */
      if (!feed || (feed.items && feed.items.length < 3)) {
        this.doLoad();
      }
    }
  }

  render() {
    let reactKey = -1;
    const {
      detailLevel,
      feeds,
      language,
      pagination,
    } = this.props;

    const {
      error,
    } = this.state;

    const {
      feed,
    } = pickFeed({
      type: 'newsItem',
      language,
      feeds,
      detailLevel,
    });
   
    const composedFeed: IRssFeed = composeFeeds(feed, feeds.Podcast).feed!;

    return (
      <div
        className={`${styles.LatestNews} ${styles[detailLevel]}`}
        key={reactKey += 1}
      >
        <div className={styles.NewsContainer}>
          {
            error ?
              /* Display the error if loading fails. */
              <div style={{ textAlign: 'center', margin: '0 auto', }}>{error}</div> :
              <PreviewFeed
                childComponentConstructor={({ item, }) => newsChildConstructor({ detailLevel, item, })}
                feed={composedFeed}
                pagination={pagination}
              />
          }
        </div>
      </div>
    );
  }
}

export const mapStateToProps: MapStateToProps<TLatestNewsOwnProps & TLatestNewsStoreProps, TLatestNewsOwnProps, TStoreProps> = ({
  language,
  feeds,
}, ownProps) => ({
  ...ownProps,
  feeds,
  language,
});

export const mapDispatchToProps = (dispatch: Function) => ({
  getNewsFeed(
    feedKey: keyof TFeedsMap,
    composeWith: IRssFeed | null = null
  ): Promise<IRssAction>
  {
    const thunk = createRssThunk({
      composeWith,
      feedKey: feedKey,
    });

    return dispatch(thunk);
  },

  getPodcasts(): Promise<IRssAction> {
    const thunk = createRssThunk({ feedKey: FeedKeys.Podcast, });
    return dispatch(thunk);
  },
});

export const ConnectedLatestNews = connect(mapStateToProps, mapDispatchToProps)(LatestNews);

export const newsChildConstructor = ({
  detailLevel,
  item,
}: {
  detailLevel: FeedDetailLevels,
  item: IRssPost,
}) => {
  if (detailLevel === FeedDetailLevels.Full) {
    if ('itunesEpisode' in item) {
      return (
        <PodcastItemFull item={item} />
      );
    } else {
      return (
        <NewsItemFull item={item} />
      );
    }
  } else {
    if ('itunesEpisode' in item) {
      return (
        <PodcastItemPreview item={item} />
      );
    } else {
      return (
        <NewsItemPreview item={item} />
      );
    }
  }
};

export default LatestNews;
