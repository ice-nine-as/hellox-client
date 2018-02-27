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
const _styles = styles || {};

let key = -1;

export class LatestNews extends React.PureComponent<TLatestNewsOwnProps & TLatestNewsDispatchProps> {
  /* TODO: Prevent multiple attempts to load the same resource? Set a maximum
   * number of attempts? */

  doLoad() {
    /* Does not use title feeds at present. */
    let feedKey: keyof TFeedsMap;
    if (this.props.language === Languages.Norwegian) {
      feedKey = 'newsFullNoFeed';
    } else if (this.props.language === Languages.Russian) {
      feedKey = 'newsFullRuFeed';
    } else {
      feedKey = 'newsFullEnFeed';
    }

    const feed = this.props.feeds[feedKey];
    if (!feed) {
      console.log(`Loading ${feedKey} on client.`);
      this.props.getNewsFeed(feedKey);
    }
  }

  makeNewsItems(item: IRssPost) {
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

  render() {
    const {
      feeds,
    } = this.props;

    const feed = (() => {
      if (this.props.language === Languages.Norwegian) {
        return feeds.newsFullNoFeed;
      } else if (this.props.language === Languages.Russian) {
        return feeds.newsFullRuFeed;
      } else {
        return feeds.newsFullEnFeed;
      }
    })();

    const newsItems = feed ? feed.items.map(this.makeNewsItems) : [];

    /* TODO: Add internationalization to no news items message. */
    return (
      <div
        className={_styles.LatestNews}
        key={key += 1}>
        {newsItems.length > 0 ? newsItems : 'Sorry, no news yet!'}
      </div>
    );
  }
}

export const mapStateToProps = ({
  language,
  feeds,
}: TStoreProps) => ({
  language,
  feeds,
});

export const mapDispatchToProps = (dispatch: Function) => ({
  getNewsFeed(feedKey: keyof TFeedsMap) {
    const subtype = (() => {
      if (feedKey === 'newsTitlesEnFeed') {
        return RssActionSubtypes.NewsTitlesEn;
      } else if (feedKey === 'newsFullNoFeed') {
        return RssActionSubtypes.NewsFullNo;
      } else if (feedKey === 'newsTitlesNoFeed') {
        return RssActionSubtypes.NewsTitlesNo;
      } else if (feedKey === 'newsFullRuFeed') {
        return RssActionSubtypes.NewsFullRu;
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