import {
  TNewsItemFullProps,
} from '../TypeAliases/TNewsItemFullProps';

import * as React from 'react';

// @ts-ignore
import styles from '../Styles/Components/NewsItemFull.less';
const _styles = styles || {};

export class NewsItemFull extends React.PureComponent<TNewsItemFullProps> {
  render() {
    return (
      <article
        className={_styles.NewsItemFull}
        dangerouslySetInnerHTML={{ __html: this.props.html, }}
      ></article>
    );
  }
}

export default NewsItemFull;