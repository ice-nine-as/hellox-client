import {
  TPageProps,
} from '../TypeAliases/TPageProps';

import * as React from 'react';

// @ts-ignore
import styles from '../Styles/Pages/ServerError';

export class ServerError extends React.PureComponent<TPageProps> {
  render() {
    return (
      <div className={styles.ServerError}>
        Unknown error. Sorry for the trouble!
      </div>
    );
  }
}

export default ServerError;