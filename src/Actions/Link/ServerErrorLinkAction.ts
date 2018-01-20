import {
  ILinkAction,
} from './ILinkAction';
import {
  PageIdentifiers,
} from '../../Enums/PageIdentifiers';

export const ServerErrorLinkAction: ILinkAction = Object.freeze({
  type: PageIdentifiers.ServerError,
  payload: {},
  value: null,
});

export default ServerErrorLinkAction;