import {
  TNewsItemFullProps,
} from '../TypeAliases/TNewsItemFullProps';

import * as React from 'react';

// @ts-ignore
import styles from '../Styles/Components/NewsItemFull.less';
const _styles = styles || {};

export class NewsItemFull extends React.PureComponent<TNewsItemFullProps> {
  getPreparedHtml(str: string): { __html: string, } {
    return { __html: str, }
  }

  render() {
    return (
      <div
        className={_styles.NewsItemFull}
        dangerouslySetInnerHTML={this.getPreparedHtml(this.props.item.description)}
      ></div>
    );
  }
}

export default NewsItemFull;