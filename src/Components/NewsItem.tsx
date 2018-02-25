/*import {
  getSanitizedHtml,
} from '../Modules/getSanitizedHtml';*/
import {
  NewsItemStates,
} from '../Enums/NewsItemStates';
import {
  TNewsItemProps,
} from '../TypeAliases/TNewsItemProps';

import * as React from 'react';

// @ts-ignore
import styles from '../Styles/Components/NewsItem.less';
const _styles = styles || {};

export class NewsItem extends React.PureComponent<TNewsItemProps> {
  render() {
    const className = (() => {
      if (this.props.state === NewsItemStates.Full) {
        return _styles.NewsItemFull;
      } else if (this.props.state === NewsItemStates.Partial) {
        return _styles.NewsItemPartial;
      } else {
        return _styles.NewsItemPreview;
      }
    })();

    return (
      <div className={_styles.NewsItem}>
        <h3 className={_styles.NewsItemTitle}>
          {this.props.title}
        </h3>
        {
          this.props.state === NewsItemStates.Full ?
            <article
              className={className}
              dangerouslySetInnerHTML={{ __html: this.props.html, }}
            ></article> :
            <div
              className={className}
              dangerouslySetInnerHTML={{ __html: this.props.html, }}
            ></div>
        }
      </div>
    );
  }
}

export default NewsItem;