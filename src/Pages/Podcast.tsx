import {
  TPageProps
} from '../TypeAliases/TPageProps';

import * as React from 'react';

// @ts-ignore
import styles from '../Styles/Pages/Podcast.less';
const _styles = styles || {};

export class Podcast extends React.PureComponent<TPageProps> {
  render() {
    return (
      <div className={`${_styles.Podcast} ${_styles.Page}`}>
        Listen.
      </div>
    );
  }
}

export default Podcast;