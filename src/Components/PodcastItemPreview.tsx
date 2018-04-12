import {
  TPodcastItemPreviewProps,
} from '../TypeAliases/TPodcastItemPreviewProps';

import * as React from 'react';

// @ts-ignore
import styles from '../Styles/Components/PodcastItemPreview.less';
const _styles = styles || {};

export class PodcastItemPreview extends React.PureComponent<TPodcastItemPreviewProps> {
  getPreparedHtml(str: string): { __html: string, } {
    return { __html: str, }
  }

  render() {
    return (
      <div
        className={_styles.PodcastItemPreview}
        dangerouslySetInnerHTML={this.getPreparedHtml(this.props.item.description)}
      ></div>
    );
  }
}

export default PodcastItemPreview;