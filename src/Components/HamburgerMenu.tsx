import {
  HamburgerOpenAction,
} from '../Actions/App/HamburgerOpenAction';
import {
  ImageUrls,
} from '../Enums/ImageUrls';
import {
  createAppAction,
} from '../Actions/Creators/createAppAction';
import {
  connect,
} from 'react-redux';
import {
  Dispatch, AnyAction,
} from 'redux';
import {
  THamburgerMenuDispatchProps,
} from '../TypeAliases/THamburgerMenuDispatchProps';
import {
  THamburgerMenuOwnProps,
} from '../TypeAliases/THamburgerMenuOwnProps';
import {
  THamburgerMenuStateProps,
} from '../TypeAliases/THamburgerMenuStateProps';


import * as React from 'react';

// @ts-ignore
import _styles from '../Styles/Components/HamburgerMenu.less';
const styles = _styles || {};

export class HamburgerMenu extends React.PureComponent<THamburgerMenuOwnProps & THamburgerMenuStateProps & THamburgerMenuDispatchProps> {
  constructor(props: any, context?: any) {
    super(props, context);

    this.linkAction = this.linkAction.bind(this);
  }

  /* Hide the hamburger menu when the user navigates to the current page. */
  linkAction(child: React.ReactElement<any>) {
    const {
      hamburgerOpen,
      setHamburgerMenuOpenStatus,
    } = this.props;

    if (
      hamburgerOpen &&
      child.props &&
      // @ts-ignore
      child.props.to.type === location.type)
    {
      setHamburgerMenuOpenStatus(false);
    }
  }

  render() {
    const {
      children: propChildren,
      hamburgerOpen,
      setHamburgerMenuOpenStatus,
    } = this.props;

    const children = React.Children.toArray(propChildren);
    const stateClass = hamburgerOpen === true ? ' open' : '';

    return (
      <div className={`${styles.HamburgerMenu}${stateClass}`}>
        <div className={styles.HamburgerMenuLogo}>
          {
            (() => {
              const child = children[0];
              if (React.isValidElement(child)) {
                const _child = child as React.ReactElement<any>;
                return React.cloneElement(_child, {
                  onClick: () => this.linkAction(_child),
                });
              } else {
                return child;
              }
            })()
          }
        </div>

        <div className={styles.HamburgerMenuActual}>
          <button
            className={styles.HamburgerMenuIcon}
            onClick={() => setHamburgerMenuOpenStatus(!hamburgerOpen)}
          >
            <img
              alt="Hamburger menu button."
              src={ImageUrls.HamburgerMenuIcon}
            />
          </button>

          <div
            className={`${styles.HamburgerMenuContents}${stateClass}`}
          >
            {React.Children.map(children.slice(1), (child) => {
              if (React.isValidElement(child)) {
                const _child = child as React.ReactElement<any>;
                return React.cloneElement(_child, {
                  onClick: () => this.linkAction(_child),
                });
              } else {
                return child;
              }
            })}
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

export const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  setHamburgerMenuOpenStatus(isOpen: boolean) {
    return dispatch(createAppAction(HamburgerOpenAction, isOpen));
  },
});

export const ConnectedHamburgerMenu =
  connect(mapStateToProps, mapDispatchToProps)(HamburgerMenu);

export default HamburgerMenu;