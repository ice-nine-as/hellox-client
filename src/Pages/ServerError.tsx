import {
  TPageProps,
} from '../TypeAliases/TPageProps';

import * as React from 'react';

// @ts-ignore
import _styles from '../Styles/Pages/ServerError.less';
const styles = _styles || {};

export class ServerError extends React.PureComponent<TPageProps> {
  render() {
    return (
      <div className={`${styles.ServerError} ${styles.Page}`}>
        Unknown error. Sorry for the trouble!
      </div>
    );
  }
}

export default ServerError;