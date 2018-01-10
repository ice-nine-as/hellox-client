import {
  TPageProps
} from '../TypeAliases/TPageProps';

import * as React from 'react';

// @ts-ignore
import styles from '../Styles/Pages/Logout';

export class Logout extends React.PureComponent<TPageProps> {
  render() {
    return (
      <div className={styles.Logout}>
        Logout.
      </div>
    );
  }
}

export default Logout;