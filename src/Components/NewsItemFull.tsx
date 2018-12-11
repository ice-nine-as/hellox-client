import {
  getSanitizedHtml,
} from '../Functions/getSanitizedHtml';
import {
  TNewsItemFullProps,
} from '../TypeAliases/TNewsItemFullProps';

import * as React from 'react';

// @ts-ignore
import _styles from '../Styles/Components/NewsItemFull.less';
const styles = _styles || {};

export class NewsItemFull extends React.PureComponent<TNewsItemFullProps> {
  render() {
    const {
      item,
    } = this.props;

    return (
      <div
        className={styles.NewsItemFull}
        dangerouslySetInnerHTML={getSanitizedHtml(item.description)}
      ></div>
    );
  }
}

export default NewsItemFull;