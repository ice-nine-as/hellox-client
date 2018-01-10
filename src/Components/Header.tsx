import {
  getDefaultNavLinks,
} from '../Modules/getDefaultNavLinks';
import {
  NavBar,
} from './NavBar';

import * as React from 'react';

// @ts-ignore
import styles from '../Styles/Components/Header.less';

export class Header extends React.PureComponent<{}> {
  render() {
    return (
      <div className={styles.Header}>
        <NavBar>
          {getDefaultNavLinks()}
        </NavBar>
      </div>
    );
  }
}

export default Header;