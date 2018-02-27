import {
  TPageProps
} from '../TypeAliases/TPageProps';

import * as React from 'react';

// @ts-ignore
import styles from '../Styles/Pages/ReadDiscuss.less';

export class ReadDiscuss extends React.PureComponent<TPageProps> {
  render() {
    return (
      <div className={styles.ReadDiscuss}>
        Login.
      </div>
    );
  }
}

export default ReadDiscuss;