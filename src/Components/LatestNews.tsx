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
  NewsItem,
} from './NewsItem';
import {
  NewsItemStates,
} from '../Enums/NewsItemStates';
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
import { FeedDetailLevels } from '../Enums/FeedDetailLevels';
const _styles = styles || {};

let key = -1;

export class LatestNews extends React.PureComponent<TLatestNewsOwnProps & TLatestNewsDispatchProps> {
  constructor(props, context) {
    super(props, context);

    this.getFeedKey = this.getFeedKey.bind(this);
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
      link,
      pubDate,
      title,
    } = item;

    return (
      <NewsItem
        html={html}
        key={key += 1}
        link={link}
        pubDate={pubDate}
        title={title}
        state={NewsItemStates.Preview} />
    );
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
        return 'newsTeasersNoFeed';
      } else if (this.props.language === Languages.Russian) {
        return 'newsTeasersRuFeed';
      } else {
        return 'newsTeasersEnFeed';
      }
    } else if (this.props.detailLevel === FeedDetailLevels.Titles) {
      if (this.props.language === Languages.Norwegian) {
        return 'newsTitlesNoFeed';
      } else if (this.props.language === Languages.Russian) {
        return 'newsTitlesRuFeed';
      } else {
        return 'newsTitlesEnFeed';
      }
    } else {
      if (this.props.language === Languages.Norwegian) {
        return 'newsFullNoFeed';
      } else if (this.props.language === Languages.Russian) {
        return 'newsFullRuFeed';
      } else {
        return 'newsFullEnFeed';
      }
    }
  }

  render() {
    const {
      feeds,
      detailLevel,
    } = this.props;

    const feedKey = this.getFeedKey(); 
    const feed = feeds[feedKey];

    /* TODO: Add internationalization to no news items message. */
    const newsItems = feed ?
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
ownProps: {
  detailLevel: FeedDetailLevels,
}) => ({
  language,
  feeds,
  ...ownProps,
});

export const mapDispatchToProps = (dispatch: Function) => ({
  getNewsFeed(feedKey: keyof TFeedsMap) {
    const subtype = (() => {
      if (feedKey === 'newsTeasersEnFeed') {
        return RssActionSubtypes.NewsTeasersEn;
      } else if (feedKey === 'newsTitlesEnFeed') {
        return RssActionSubtypes.NewsTitlesEn;
      } else if (feedKey === 'newsFullNoFeed') {
        return RssActionSubtypes.NewsFullNo;
      } else if (feedKey === 'newsTeasersNoFeed') {
        return RssActionSubtypes.NewsTeasersNo;
      } else if (feedKey === 'newsTitlesNoFeed') {
        return RssActionSubtypes.NewsTitlesNo;
      } else if (feedKey === 'newsFullRuFeed') {
        return RssActionSubtypes.NewsFullRu;
      } else if (feedKey === 'newsTeasersRuFeed') {
        return RssActionSubtypes.NewsTeasersRu;
      } else if (feedKey === 'newsTitlesRuFeed') {
        return RssActionSubtypes.NewsTitlesRu;
      } else {
        return RssActionSubtypes.NewsFullEn;
      }
    })();

    return dispatch(getRssFeedThunk(subtype));
  }
});

export const ConnectedLatestNews =
  connect(mapStateToProps, mapDispatchToProps)(LatestNews); 

export default LatestNews;