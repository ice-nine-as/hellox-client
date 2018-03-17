import {
  FeedDetailLevels,
} from '../Enums/FeedDetailLevels';
import {
  FeedKeys,
} from '../Enums/FeedKeys';
import {
  getFeed,
} from '../Modules/getFeed';
import {
  getRssFeedThunk,
} from '../Actions/Creators/getRssFeedThunk';
import {
  NewsItemFull,
} from './NewsItemFull';
import {
  NewsItemPreview,
} from './NewsItemPreview';
import {
  connect,
} from 'react-redux';
import {
  TLatestNewsDispatchProps,
} from '../TypeAliases/TLatestNewsDispatchProps';
import {
  TLatestNewsOwnProps,
} from '../TypeAliases/TLatestNewsOwnProps';
import {
  TStoreProps,
} from '../TypeAliases/TStoreProps';

import * as React from 'react';

// @ts-ignore
import styles from '../Styles/Components/LatestNews.less';
const _styles = styles || {};

let reactKey = -1;

export class LatestNews extends React.PureComponent<TLatestNewsOwnProps & TLatestNewsDispatchProps> {
  /* TODO: Prevent multiple attempts to load the same resource? Set a maximum
   * number of attempts? */
  async doLoad() {
    /* Loads the relevant feed based on language and detail level. */ 
    const {
      feed,
      key,
    } = getFeed(
      'newsItem',
      this.props.language,
      this.props.feeds,
      this.props.detailLevel);

    if (!feed) {
      this.props.getNewsFeed(key);
    }
  }

  componentDidMount() {
    this.doLoad();
  }

  componentDidUpdate() {
    this.doLoad();
  }

  render() {
    const {
      detailLevel,
      feeds,
      language,
    } = this.props;

    const {
      feed,
    } = getFeed('newsItem', language, feeds, detailLevel);

    /* TODO: Add internationalization to no news items message. */
    const newsItems = feed && feed.items && feed.items.length > 0 ?
      feed.items.map((item) => {
        if (this.props.detailLevel === FeedDetailLevels.Full) {
          return <NewsItemFull item={item} key={reactKey += 1} />;
        } else {
          return <NewsItemPreview item={item} key={reactKey += 1} />;
        }
      }) :
      'Sorry, no news yet!';

    return (
      <div
        className={_styles.LatestNews}
        key={reactKey += 1}
      >
        {newsItems}
      </div>
    );
  }
}

export const mapStateToProps = ({
  language,
  feeds,
}: TStoreProps,
ownProps: { detailLevel: FeedDetailLevels, }) => ({
  ...ownProps,
  feeds,
  language,
});

export const mapDispatchToProps = (
  dispatch: Function
) => ({
  getNewsFeed: (feedKey: FeedKeys, offset: number = 0) => {
    return dispatch(getRssFeedThunk(feedKey, offset || 0));
  },
});

export const ConnectedLatestNews = connect(mapStateToProps, mapDispatchToProps)(LatestNews); 

export default LatestNews;