import {
  TPageProps
} from '../TypeAliases/TPageProps';

import * as React from 'react';

// @ts-ignore
import styles from '../Styles/Pages/Talk';

export class Talk extends React.PureComponent<TPageProps> {
  render() {
    return (
      <div className={styles.Talk}>
        Talking.
      </div>
    );
  }
}

export default Talk;