import {
  TPageProps
} from '../TypeAliases/TPageProps';

import * as React from 'react';
// @ts-ignore
import styles from '../Styles/Loading';

export class Loading extends React.Component<TPageProps> {
  render() {
    return (
      <div className={styles.Loading}>
        Loading...
      </div>
    );
  }
}

export default Loading;