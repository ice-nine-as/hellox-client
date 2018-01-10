import {
  TNavBarProps,
} from '../TypeAliases/TNavBarProps';

import * as React from 'react';

// @ts-ignore
import styles from '../Styles/Components/NavBar.less';

export class NavBar extends React.PureComponent<TNavBarProps> {
  render() {
    return (
      <div className={styles.NavBar}>
        {React.Children.map(this.props.children, (child) => {
          if (typeof child === 'string' || typeof child === 'number') {
            return child;
          }

          const cn = child.props.className;
          const nbi = 'NavBarItem';
          const className = cn ? `${cn} ${nbi}` : nbi;
          return React.cloneElement(child, {
            className,
          });
        })}
      </div>
    );
  }
}

export default NavBar;