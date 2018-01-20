import {
  TPageProps
} from '../TypeAliases/TPageProps';

import * as React from 'react';

// @ts-ignore
import styles from '../Styles/Pages/Login.less';

export class Login extends React.PureComponent<TPageProps> {
  render() {
    return (
      <div className={styles.Login}>
        Login.
      </div>
    );
  }
}

export default Login;