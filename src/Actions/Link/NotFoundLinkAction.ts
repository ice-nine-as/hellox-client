import {
  ILinkAction,
} from './ILinkAction';
import {
  PageIdentifiers,
} from '../../Enums/PageIdentifiers';

export const NotFoundLinkAction: ILinkAction = Object.freeze({
  type: PageIdentifiers.NotFound,
  payload: {},
  value: null,
});

export default NotFoundLinkAction;