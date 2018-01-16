import {
  TNavBarProps,
} from '../TypeAliases/TNavBarProps';

import * as React from 'react';

// @ts-ignore
import styles from '../Styles/Components/NavBar.less';
// @ts-ignore
import styles from '../Styles/Components/NavBarItem.less';

export class NavBar extends React.PureComponent<TNavBarProps> {
  render() {
    return (
      <div className={(styles || {}).NavBar}>
        {React.Children.map(this.props.children, (child) => {
          if (!child) {
            return null;
          }

          const cn = ((child as any).props || {}).className || '';
          const nbi = (styles || {}).NavBarItem;
          const className = cn ? `${cn} ${nbi}` : String(nbi);
          
          return typeof child === 'string' || typeof child === 'number' ?
            <span className={className}>{child}</span> :
            React.cloneElement(child, { className, });
        })}
      </div>
    );
  }
}

export default NavBar;