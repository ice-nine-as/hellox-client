import {
  FeedDetailLevels,
} from '../Enums/FeedDetailLevels';
import {
  FeedKeys,
} from '../Enums/FeedKeys';
import {
  getRssFeedThunk,
} from '../Actions/Creators/getRssFeedThunk';
import {
  IRssPost,
} from '../Interfaces/IRssPost';
import {
  Languages,
} from '../Enums/Languages';
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
  RssActionSubtypes,
} from '../Enums/RssActionSubtypes';
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
  TStoreProps,
} from '../TypeAliases/TStoreProps';

import * as React from 'react';

// @ts-ignore
import styles from '../Styles/Components/LatestNews.less';
const _styles = styles || {};

let key = -1;

export class LatestNews extends React.PureComponent<TLatestNewsOwnProps & TLatestNewsDispatchProps> {
  constructor(props: TLatestNewsOwnProps & TLatestNewsDispatchProps, context: object) {
    super(props, context);

    this.getFeedKey = this.getFeedKey.bind(this);
    this.makeNewsItem = this.makeNewsItem.bind(this);
  }

  /* TODO: Prevent multiple attempts to load the same resource? Set a maximum
   * number of attempts? */
  doLoad() {
    /* Loads the relevant feed based on language and detail level. */ 
    const feedKey = this.getFeedKey();
    const feed = this.props.feeds[feedKey];
    if (!feed) {
      console.log(`Loading ${feedKey} on client.`);
      this.props.getNewsFeed(feedKey);
    }
  }

  makeNewsItem(item: IRssPost) {
    const {
      description: html,
    } = item;

    return this.props.detailLevel === FeedDetailLevels.Full ?
      <NewsItemFull
        html={html}
        key={key += 1}
      /> :
      <NewsItemPreview
        html={html}
        key={key += 1}
      />;
  }

  componentDidMount() {
    this.doLoad();
  }

  componentDidUpdate() {
    this.doLoad();
  }

  getFeedKey() {
    if (this.props.detailLevel === FeedDetailLevels.Teaser) {
      if (this.props.language === Languages.Norwegian) {
        return FeedKeys.NewsTeasersNo;
      } else if (this.props.language === Languages.Russian) {
        return FeedKeys.NewsTeasersRu;
      } else {
        return FeedKeys.NewsTeasersEn;
      }
    } else if (this.props.detailLevel === FeedDetailLevels.Titles) {
      if (this.props.language === Languages.Norwegian) {
        return FeedKeys.NewsTitlesNo;
      } else if (this.props.language === Languages.Russian) {
        return FeedKeys.NewsTitlesRu;
      } else {
        return FeedKeys.NewsTitlesEn;
      }
    } else {
      if (this.props.language === Languages.Norwegian) {
        return FeedKeys.NewsFullNo;
      } else if (this.props.language === Languages.Russian) {
        return FeedKeys.NewsFullRu;
      } else {
        return FeedKeys.NewsFullEn;
      }
    }
  }

  render() {
    const { feeds, } = this.props;
    const feedKey = this.getFeedKey(); 
    const feed = feeds[feedKey];

    /* TODO: Add internationalization to no news items message. */
    const newsItems = feed && feed.items && feed.items.length > 0 ?
      feed.items.map(this.makeNewsItem) :
      'Sorry, no news yet!';

    return (
      <div
        className={_styles.LatestNews}
        key={key += 1}
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
ownProps: object) => ({
  language,
  feeds,
  ...ownProps,
});

export const mapDispatchToProps = (dispatch: Function) => ({
  getNewsFeed(feedKey: keyof TFeedsMap) {
    const subtype = feedKey in RssActionSubtypes ?
      RssActionSubtypes[feedKey] :
      RssActionSubtypes.NewsFullEn;

    return dispatch(getRssFeedThunk(subtype));
  }
});

export const ConnectedLatestNews =
  connect(mapStateToProps, mapDispatchToProps)(LatestNews); 

export default LatestNews;