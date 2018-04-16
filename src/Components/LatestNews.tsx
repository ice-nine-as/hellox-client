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


export class LatestNews extends React.PureComponent<TLatestNewsOwnProps & TLatestNewsStoreProps & TLatestNewsDispatchProps> {
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

    /* For some reason, possibly that we're only mutating a portion of a feed,
    * the getNewsFeed method occasionally refuses to render new articles when
    * a single article has been fetched beforehand. This is avoided through
    * forceUpdate below. */

    if (!feed) {
      this.props.getNewsFeed(key)
        .then(() => this.forceUpdate(),
          (reason) => console.error(reason));
    } else if (feed.items && feed.items.length < 3) {
      /* A single article has been loaded through an Article page. We won't
      * bother to guess where it is in the feed. */
      this.props.getNewsFeed(key, 0, feed)
        .then(() => this.forceUpdate(),
          (reason) => console.error(reason));
    }
  }

  componentDidMount() {
    if (!isNode()) {
      this.doLoad();
    }
  }

  render() {
    let key = -1;
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
    const newsItems = feed && feed.items && feed.items.length > 0 ?
      feed.items.map((item) => {
        if (this.props.detailLevel === FeedDetailLevels.Full) {
          return (
            <NewsItemFull
              item={item}
              key={key += 1}
            />
          );
        } else {
          return (
            <NewsItemPreview
              item={item}
              key={key += 1}
            />
          );
        }
      }) :
      <p>{'Sorry, no news yet!'}</p>;

    return (
      <div
        className={`${_styles.LatestNews} ${_styles[this.props.detailLevel]}`}
        key={key += 1}
      >
        {newsItems}
        <div className={_styles.FillerItem} />
        <div className={_styles.FillerItem} />
        <div className={_styles.FillerItem} />
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
  getNewsFeed(feedKey: keyof TFeedsMap, offset: number = 0, composeWith: IRssFeed | null = null): Promise<IRssAction> {
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
