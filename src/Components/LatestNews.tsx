import {
  FeedDetailLevels,
} from '../Enums/FeedDetailLevels';
import {
  getFeed,
} from '../Modules/getFeed';
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
} from '../Modules/isNode';
import {
  LoadMoreButton,
} from './LoadMoreButton';
import {
  NewsItemFull,
} from './NewsItemFull';
import {
  NewsItemPreview,
} from './NewsItemPreview';
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
import styles from '../Styles/Components/LatestNews.less';
const _styles = styles || {};


export class LatestNews extends React.Component<TLatestNewsOwnProps & TLatestNewsStoreProps & TLatestNewsDispatchProps, { error: string, loadMoreVisible: boolean, }> {
  constructor(props: any, context?: any) {
    super(props, context);

    this.state = {
      error:           '',
      loadMoreVisible: true,
    };

    this.doLoad = this.doLoad.bind(this);
  }
  
  /* TODO: Prevent multiple attempts to load the same resource? Set a maximum
   * number of attempts? */
  doLoad() {
    const {
      detailLevel,
      feeds,
      language,
    } = this.props;

    /* Loads the relevant feed based on language and detail level. */
    const {
      feed,
      key,
    } = getFeed({
      type: 'newsItem',
      detailLevel,
      feeds,
      language,
    });

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
    if (!feed) {
      this.props.getNewsFeed(key)
        .then(
          /* Resolve */
          () => this.forceUpdate(),

          /* Reject */
          (reason) => rejector(reason)
        );
    } else if (feed.currentOffset) {
      const origFeedLength = feed.items.length;

      /* We've already loaded a set of articles, so we need to use the offset. */
      this.props.getNewsFeed(key, feed.currentOffset, feed)
        .then(
          /* Resolve */
          (action) => {
            if (action.value &&
                /* If less than three items were fetched, the tail has been reached. */
                action.value.items.length < origFeedLength + 3)
            {
              /* Feed is now at tail and the Load More button should be disabled. */
              this.setState({
                loadMoreVisible: false,
              });
            } else {
              this.forceUpdate();
            }
          },

          /* Reject */
          (reason) => {
            rejector(reason);
          }
        )
    } else if (feed.items && feed.items.length < 3) {
      /* A single article has been loaded through an Article page. We won't
       * bother to guess where it is in the feed. */
      this.props.getNewsFeed(key, 0, feed)
        .then(
          /* Resolve */
          () => this.forceUpdate(),

          /* Reject */
          (reason) => rejector(reason)
        );
    } else {
      this.props.getNewsFeed(key, 0, feed).then(
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
      } = getFeed({
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
    } = this.props;

    const {
      feed,
    } = getFeed({
      type: 'newsItem',
      language,
      feeds,
      detailLevel,
    });

    /* TODO: Add internationalization to no news items message. */
    const newsItems = (() => {
      if (!feed) {
        return (
          <p key="___key">
            News is loading...
          </p>
        );
      } else if (feed.items && feed.items.length > 0) {
        return feed.items.map((item) => {
          if (this.props.detailLevel === FeedDetailLevels.Full) {
            return (
              <NewsItemFull
                item={item}
                key={reactKey += 1}
              />
            );
          } else {
            return (
              <NewsItemPreview
                item={item}
                key={reactKey += 1}
              />
            );
          }
        });
      } else {
        return (
          <p key="____key">
            Sorry, no news yet!
          </p>
        );
      }
    })();

    return (
      <div
        className={`${_styles.LatestNews} ${_styles[this.props.detailLevel]}`}
        key={reactKey += 1}
      >
        {
          this.state.error ?
            /* Display the error if loading fails. */
            this.state.error :
            [
              newsItems,
              
              (() => {
                if (!feed) {
                  /* Don't show the Load More button if the feed hasn't been
                   * fetched. */
                  return null;
                } else if (this.state.loadMoreVisible) {
                  return (
                    <LoadMoreButton
                      func={this.doLoad}
                      key="_key1"
                    />
                  );
                } else {
                  return (
                    <p
                      className={styles.NoMoreNews}
                      key="_key2"
                    >
                      No more news!
                    </p>
                  );
                }
              })(),
            ]
        }
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

export const ConnectedLatestNews = connect(mapStateToProps, mapDispatchToProps)(LatestNews);

export default LatestNews;
