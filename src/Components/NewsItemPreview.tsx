import {
  TNewsItemPreviewProps,
} from '../TypeAliases/TNewsItemPreviewProps';

import * as React from 'react';

// @ts-ignore
import styles from '../Styles/Components/NewsItemPreview.less';
const _styles = styles || {};

export class NewsItemPreview extends React.PureComponent<TNewsItemPreviewProps> {
  render() {
    return (
      <div
        className={_styles.NewsItemPreview}
        dangerouslySetInnerHTML={{ __html: this.props.html, }}
      ></div>
    );
  }
}

export default NewsItemPreview;