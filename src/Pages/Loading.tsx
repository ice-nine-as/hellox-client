import {
  TPageProps
} from '../TypeAliases/TPageProps';

import * as React from 'react';

// @ts-ignore
import styles from '../Styles/Pages/Loading';

export class Loading extends React.PureComponent<TPageProps> {
  render() {
    return (
      <div className={styles.Loading}>
        <span className={styles.LoadingMessage}>Loading...</span>
        <div>
          <span className={styles.LoadingIcon}>
            ⟳
          </span>
        </div>
      </div>
    );
  }
}

export default Loading;