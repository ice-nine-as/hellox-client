import {
  TPageProps
} from '../TypeAliases/TPageProps';

import * as React from 'react';

// @ts-ignore
import styles from '../Styles/Pages/ReadWrite';

export class ReadWrite extends React.PureComponent<TPageProps> {
  render() {
    return (
      <div className={styles.ReadWrite}>
        Read/Write.
      </div>
    );
  }
}

export default ReadWrite;