import {
  ILinkAction,
} from './ILinkAction';
import {
  PageIdentifiers,
} from '../../Enums/PageIdentifiers';

export const ReadWriteLinkAction: ILinkAction = Object.freeze({
  type: PageIdentifiers.ReadWrite,
  payload: {},
  value: null,
});

export default ReadWriteLinkAction;