import {
  ILinkAction,
} from './ILinkAction';
import {
  PageIdentifiers,
} from '../../Enums/PageIdentifiers';

export const FootnotesLinkAction: ILinkAction = Object.freeze({
  type: PageIdentifiers.Footnotes,
  payload: {},
  value: null,
});

export default FootnotesLinkAction;