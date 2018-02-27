import {
  IAppAction,
} from '../Actions/App/IAppAction';

export type THamburgerMenuDispatchProps = {
  toggleHamburgerMenu: (state: boolean) => IAppAction;
};

export default THamburgerMenuDispatchProps;