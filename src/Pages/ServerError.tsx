import {
  TPageProps,
} from '../TypeAliases/TPageProps';

import * as React from 'react';

// @ts-ignore
import styles from '../Styles/Pages/ServerError.less';
const _styles = styles || {};

export class ServerError extends React.PureComponent<TPageProps> {
  render() {
    return (
      <div className={`${_styles.ServerError} ${_styles.Page}`}>
        Unknown error. Sorry for the trouble!
      </div>
    );
  }
}

export default ServerError;