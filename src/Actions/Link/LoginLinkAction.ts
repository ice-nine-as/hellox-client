import {
  ILinkAction,
} from './ILinkAction';
import {
  PageIdentifiers,
} from '../../Enums/PageIdentifiers';

export const LoginLinkAction: ILinkAction = Object.freeze({
  type: PageIdentifiers.Login,
  payload: {},
  value: null,
});

export default LoginLinkAction;