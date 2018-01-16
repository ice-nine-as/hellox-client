import {
  ILinkAction,
} from './ILinkAction';
import {
  PageIdentifiers,
} from '../../Enums/PageIdentifiers';

export const LogoutLinkAction: ILinkAction = Object.freeze({
  type: PageIdentifiers.Logout,
  payload: {},
  value: null,
});

export default LogoutLinkAction;