import {
  HamburgerOpenAction,
} from '../Actions/App/HamburgerOpenAction';
import {
  ImageUrls,
} from '../Enums/ImageUrls';
import {
  makeAppAction,
} from '../Modules/makeAppAction';
import {
  connect,
} from 'react-redux';
import {
  Dispatch,
} from 'redux';
import {
  THamburgerMenuDispatchProps,
} from '../TypeAliases/THamburgerMenuDispatchProps';
import {
  THamburgerMenuOwnProps,
} from '../TypeAliases/THamburgerMenuOwnProps';

import * as React from 'react';

// @ts-ignore
import styles from '../Styles/Components/HamburgerMenu.less';
const _styles = styles || {};

export class HamburgerMenu extends React.PureComponent<THamburgerMenuOwnProps & THamburgerMenuDispatchProps> {
  render() {
    const children = React.Children.toArray(this.props.children);
    const stateClass = this.props.hamburgerOpen === true ? ' open' : '';

    return (
      <div className={_styles.HamburgerMenu}>
        <div className={_styles.HamburgerMenuLogo}>
          {children[0]}
        </div>

        <div className={_styles.HamburgerMenuActual}>
          <button
            className={_styles.HamburgerMenuIcon}
            onClick={() => this.props.toggleHamburgerMenu(this.props.hamburgerOpen)}
          >
            <img
              alt="Hamburger menu button."
              src={ImageUrls.HamburgerMenuIcon}
            />
          </button>

          <div
            className={`${_styles.HamburgerMenuContents}${stateClass}`}
          >
            {children.slice(1)}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  hamburgerOpen,
}: {
  hamburgerOpen: boolean,
}) => ({
  hamburgerOpen,
});

const mapDispatchToProps = (dispatch: Dispatch<{}>) => ({
  toggleHamburgerMenu(state: boolean) {
    return dispatch(makeAppAction(HamburgerOpenAction, !state));
  },
});

export const ConnectedHamburgerMenu =
  connect(mapStateToProps, mapDispatchToProps)(HamburgerMenu);

export default HamburgerMenu;