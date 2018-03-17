import {
  getDefaultNavLinks,
} from '../Modules/getDefaultNavLinks';
import {
  NavBar,
} from './NavBar';
import {
  THeaderProps,
} from '../TypeAliases/THeaderProps';

import * as React from 'react';

// @ts-ignore
import styles from '../Styles/Components/Header.less';
const _styles = styles || {};

export class Header extends React.PureComponent<THeaderProps> {
  render() {
    return (
      <div className={`${_styles.Header} Header Page-${this.props.page}`}>
        <NavBar>
          {getDefaultNavLinks()}
        </NavBar>
      </div>
    );
  }
}

export default Header;