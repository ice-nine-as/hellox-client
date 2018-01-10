import {
  ILinkAction,
} from './ILinkAction';
import {
  PageIdentifiers,
} from '../../Enums/PageIdentifiers';

export const HomeLinkAction: ILinkAction = Object.freeze({
  type: PageIdentifiers.Home,
  payload: {},
});

export default HomeLinkAction;