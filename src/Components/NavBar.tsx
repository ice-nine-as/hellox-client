import {
  ConnectedHamburgerMenu,
} from './HamburgerMenu';
import {
  connect,
} from 'react-redux';
import {
  TNavBarProps,
} from '../TypeAliases/TNavBarProps';
import {
  ViewportStates,
} from '../Enums/ViewportStates';

import * as React from 'react';

// @ts-ignore
import nbStyles from '../Styles/Components/NavBar.less';
const _nbStyles = nbStyles || {};

// @ts-ignore
import nbiStyles from '../Styles/Components/NavBarItem.less';
const _nbiStyles = nbiStyles || {};

export class NavBar extends React.PureComponent<TNavBarProps> {
  render() {
    const children = React.Children.map(this.props.children, (child) => {
      if (!child) {
        return null;
      }

      const cn = ((child as any).props || {}).className || '';
      const nbi = _nbiStyles.NavBarItem;
      const className = cn ? `${cn} ${nbi}` : String(nbi);
      
      return typeof child === 'string' || typeof child === 'number' ?
        <span className={className}>{child}</span> :
        React.cloneElement(child, { className, });
    });

    return (
      <div className={_nbStyles.NavBar}>
        {
          this.props.viewportState === ViewportStates.Mobile ?
            /* Default to hamburger menu. */
            <ConnectedHamburgerMenu>{children}</ConnectedHamburgerMenu> :
            children
        }
      </div>
    );
  }
}

export const mapStateToProps = ({
  viewportState,
}: {
  viewportState: ViewportStates,
}): TNavBarProps => ({
  viewportState,
});

export const ConnectedNavBar = connect(mapStateToProps)(NavBar);

export default NavBar;