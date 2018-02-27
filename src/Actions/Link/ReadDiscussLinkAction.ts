import {
  ILinkAction,
} from './ILinkAction';
import {
  PageIdentifiers,
} from '../../Enums/PageIdentifiers';

export const ReadDiscussLinkAction: ILinkAction = Object.freeze({
  type: PageIdentifiers.ReadDiscuss,
  payload: {},
  value: null,
});

export default ReadDiscussLinkAction;