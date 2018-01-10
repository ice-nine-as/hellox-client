import {
  ILinkAction,
} from '../Actions/Link/ILinkAction';

export type TMakeLinkAction<T extends ILinkAction> = (linkAction: T, payload?: object) => T;

export default TMakeLinkAction;