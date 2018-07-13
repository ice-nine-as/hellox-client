import {
  IAppAction,
} from '../Actions/App/IAppAction';

export type THamburgerMenuDispatchProps = {
  setHamburgerMenuOpenStatus: (state: boolean) => IAppAction;
};

export default THamburgerMenuDispatchProps;