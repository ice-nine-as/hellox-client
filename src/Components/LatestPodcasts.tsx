import {
  FeedDetailLevels,
} from '../Enums/FeedDetailLevels';
import {
  pickFeed,
} from '../Functions/pickFeed';
import {
  createRssThunk,
} from '../Actions/Creators/createRssThunk';
import {
  IPodcastPost,
} from '../Interfaces/IPodcastPost';
import {
  IRssAction,
} from '../Actions/App/IRssAction';
import {
  IRssFeed,
} from '../Interfaces/IRssFeed';
import {
  IRssPost,
} from '../Interfaces/IRssPost';
import {
  isNode,
} from '../Functions/isNode';
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
  TLatestPodcastsDispatchProps,
} from '../TypeAliases/TLatestPodcastsDispatchProps';
import {
  TLatestPodcastsOwnProps,
} from '../TypeAliases/TLatestPodcastsOwnProps';
import {
  TLatestPodcastsStoreProps,
} from '../TypeAliases/TLatestPodcastsStoreProps';
import {
  TStoreProps,
} from '../TypeAliases/TStoreProps';

import * as React from 'react';

// @ts-ignore
import _styles from '../Styles/Components/LatestPodcasts.less';
const styles = _styles || {};

export class LatestPodcasts extends React.PureComponent<TLatestPodcastsOwnProps & TLatestPodcastsStoreProps & TLatestPodcastsDispatchProps> {
  /* TODO: Prevent multiple attempts to load the same resource? Set a maximum
   * number of attempts? */
  doLoad() {
    const {
      feeds,
      getPodcastFeed,
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

    /* For some reason, possibly that we're only mutating a portion of a feed,
    * the getPodcastsFeed method occasionally refuses to render new articles when
    * a single article has been fetched beforehand. This is avoided through
    * forceUpdate below. */

    if (!feed) {
      getPodcastFeed(key);
    } else if (feed.items && feed.items.length < 3) {
      /* A single article has been loaded through an Article page. We won't
       * bother to guess where it is in the feed. */
      getPodcastFeed(key, feed);
    }
  }

  componentDidMount() {
    /* Never fetch in components on the server. */
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
      pagination,
    } = this.props;

    const {
      feed,
    } = pickFeed({
      detailLevel,
      feeds,
      language,
      type: 'podcast',
    });

    return (
      <div
        className={`${styles.LatestPodcasts} ${styles[detailLevel]}`}
        key={key += 1}
      >
        <PreviewFeed
          childComponentConstructor={({ item, }) => podcastChildConstructor({ item, detailLevel, })}
          feed={feed}
          pagination={pagination}
        />
      </div>
    );
  }
}

export const mapStateToProps: MapStateToProps<TLatestPodcastsOwnProps & TLatestPodcastsStoreProps, TLatestPodcastsOwnProps, TStoreProps> = ({
  language,
  feeds,
}, ownProps) => ({
  ...ownProps,
  feeds,
  language,
});

export const mapDispatchToProps = (dispatch: Function) => ({
  getPodcastFeed(feedKey: keyof TFeedsMap, composeWith: IRssFeed | null = null): Promise<IRssAction> {
    const thunk = createRssThunk({
      composeWith,
      feedKey: feedKey,
    });

    return dispatch(thunk);
  },
});

export const ConnectedLatestPodcasts = connect(mapStateToProps, mapDispatchToProps)(LatestPodcasts);

export const podcastChildConstructor = ({
  detailLevel,
  item,
}: {
  detailLevel: FeedDetailLevels,
  item: IRssPost,
}) => {
  if (detailLevel === FeedDetailLevels.Full) {
    return (
      <PodcastItemFull
        item={item as IPodcastPost}
      />
    );
  } else {
    return (
      <PodcastItemPreview
        item={item as IPodcastPost}
      />
    );
  }
};

export default LatestPodcasts;
