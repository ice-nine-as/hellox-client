import {
  AppActionTypes,
} from '../../Enums/AppActionTypes';
import {
  IAppAction,
} from './IAppAction';

export const HamburgerOpenAction: IAppAction = Object.freeze({
  type: AppActionTypes.HamburgerOpen,
  value: false,
});

export default HamburgerOpenAction;