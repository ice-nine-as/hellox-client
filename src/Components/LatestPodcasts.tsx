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
  PodcastItemFull,
} from './PodcastItemFull';
import {
  PodcastItemPreview,
} from './PodcastItemPreview';
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
import styles from '../Styles/Components/LatestPodcasts.less';
import { IPodcastPost } from '../Interfaces/IPodcastPost';
const _styles = styles || {};


export class LatestPodcasts extends React.PureComponent<TLatestPodcastsOwnProps & TLatestPodcastsStoreProps & TLatestPodcastsDispatchProps> {
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

    /* For some reason, possibly that we're only mutating a portion of a feed,
    * the getPodcastsFeed method occasionally refuses to render new articles when
    * a single article has been fetched beforehand. This is avoided through
    * forceUpdate below. */

    if (!feed) {
      this.props.getPodcastFeed(key);
    } else if (feed.items && feed.items.length < 3) {
      /* A single article has been loaded through an Article page. We won't
      * bother to guess where it is in the feed. */
      this.props.getPodcastFeed(key, 0, feed)
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
      detailLevel,
      feeds,
      language,
      type: 'podcast',
    });

    /* TODO: Add internationalization to no podcasts items message. */
    const podcastItems = feed && feed.items && feed.items.length > 0 ?
      feed.items.map((item) => {
        if (this.props.detailLevel === FeedDetailLevels.Full) {
          return (
            <PodcastItemFull
              item={item as IPodcastPost}
              key={key += 1}
            />
          );
        } else {
          return (
            <PodcastItemPreview
              item={item as IPodcastPost}
              key={key += 1}
            />
          );
        }
      }) :
      'Sorry, no podcasts yet!';

    return (
      <div
        className={`${_styles.LatestPodcasts} ${_styles[this.props.detailLevel]}`}
        key={key += 1}
      >
        {podcastItems}
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
  getPodcastFeed(feedKey: keyof TFeedsMap, offset: number = 0, composeWith: IRssFeed | null = null): Promise<IRssAction> {
    const thunk = createRssThunk({
      composeWith,
      feedKey: feedKey,
      offset: offset || 0,
    });

    return dispatch(thunk);
  },
});

export const ConnectedLatestPodcasts = connect(mapStateToProps, mapDispatchToProps)(LatestPodcasts); 

export default LatestPodcasts;