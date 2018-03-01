import {
  TPodcastProps,
} from '../TypeAliases/TPodcastProps';

import * as React from 'react';

// @ts-ignore
import styles from '../Styles/Components/Podcast.less';
const _styles = styles || {};

export class Podcast extends React.PureComponent<TPodcastProps> {
  render() {
    return (
      <span
        className={_styles.Podcast}
      >
        Podcast goes here.
      </span>
    );
  }
}

export default Podcast;