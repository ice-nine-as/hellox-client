import {
  ILinkAction,
} from './ILinkAction';
import {
  PageIdentifiers,
} from '../../Enums/PageIdentifiers';

export const WriteLinkAction: ILinkAction = Object.freeze({
  type: PageIdentifiers.Write,
  payload: {},
  value: null,
});

export default WriteLinkAction;