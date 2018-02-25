import {
  IRssFeed,
} from '../Interfaces/IRssFeed';
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
  TLatestNewsProps,
} from '../TypeAliases/TLatestNewsProps';

import * as React from 'react';

// @ts-ignore
import styles from '../Styles/Components/LatestNews.less';
import { isLanguage } from '../TypeGuards/isLanguage';
const _styles = styles || {};

export class LatestNews extends React.PureComponent<TLatestNewsProps> {
  render() {
    let key = -1;
    const newsItems = this.props.rss.items.map((item) => {
      const {
        description: html,
        link,
        pubDate,
        title,
      } = item;

      /* Check if the item is a news item. */
      const re = /^(?:https?:\/\/).+?\/news\/([a-z]{2})\/.+$/;
      const result = link.match(re);
      if (typeof result !== 'object' ||
          result === null ||
          !result[1])
      {
        return null;
      }
      
      let lang = result[1];
      if (this.props.language === Languages.Norwegian &&
        (lang === 'nn' || lang === 'nb'))
      {
        /* Drupal has several options for Norwegian language codes, neither of
         * which are "no", so coercion to "no" happens here. */
        lang = Languages.Norwegian;
      } else if (!isLanguage(lang)) {
        /* All other mismatches are thrown out. */ 
        return null;
      } else if (lang !== this.props.language) {
        /* News items in different languages get thrown out too. */
        return null;
      }

      return (
        <NewsItem
          html={html}
          key={key += 1}
          language={lang}
          link={link}
          pubDate={pubDate}
          title={title}
          state={NewsItemStates.Preview} />
      );
    }).filter((elem) => elem !== null);

    return (
      <div className={_styles.LatestNews}>
        {newsItems.length > 0 ? newsItems : 'Sorry, no news yet!'}
      </div>
    );
  }
}

export const mapStateToProps = ({
  language,
  rss,
}: {
  language: Languages,
  rss: IRssFeed,
}) => ({
  language,
  rss,
});

export const ConnectedLatestNews = connect(mapStateToProps)(LatestNews); 

export default LatestNews;