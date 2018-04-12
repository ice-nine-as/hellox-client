import {
  TPodcastItemFullProps,
} from '../TypeAliases/TPodcastItemFullProps';

import * as React from 'react';

// @ts-ignore
import styles from '../Styles/Components/PodcastItemFull.less';
const _styles = styles || {};

export class PodcastItemFull extends React.PureComponent<TPodcastItemFullProps> {
  getPreparedHtml(str: string): { __html: string, } {
    return { __html: str, }
  }

  render() {
    return (
      <div
        className={_styles.PodcastItemFull}
        dangerouslySetInnerHTML={this.getPreparedHtml(this.props.item.description)}
      ></div>
    );
  }
}

export default PodcastItemFull;