import {
  NavBar,
} from './NavBar';
import {
  THeaderProps,
} from '../TypeAliases/THeaderProps';

import * as React from 'react';

// @ts-ignore
import _styles from '../Styles/Components/Header.less';
const styles = _styles || {};

export class Header extends React.PureComponent<THeaderProps> {
  render() {
    return (
      <div className={`${styles.Header} Header`}>
        <NavBar />
      </div>
    );
  }
}

export default Header;