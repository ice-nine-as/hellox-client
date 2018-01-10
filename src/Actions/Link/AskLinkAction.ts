import {
  ILinkAction,
} from './ILinkAction';
import {
  PageIdentifiers,
} from '../../Enums/PageIdentifiers';

export const AskLinkAction: ILinkAction = Object.freeze({
  type: PageIdentifiers.Ask,
  payload: {},
});

export default AskLinkAction;