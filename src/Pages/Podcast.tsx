import {
  TPageProps
} from '../TypeAliases/TPageProps';

import * as React from 'react';

// @ts-ignore
import styles from '../Styles/Pages/Podcast.less';

export class Podcast extends React.PureComponent<TPageProps> {
  render() {
    return (
      <div className={styles.Podcast}>
        Listen.
      </div>
    );
  }
}

export default Podcast;