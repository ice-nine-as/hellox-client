import {
  ILinkAction,
} from './ILinkAction';
import {
  PageIdentifiers,
} from '../../Enums/PageIdentifiers';

export const ListenLinkAction: ILinkAction = Object.freeze({
  type: PageIdentifiers.Listen,
  payload: {},
  value: null,
});

export default ListenLinkAction;