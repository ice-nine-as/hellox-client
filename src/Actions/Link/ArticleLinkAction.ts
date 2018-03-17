import {
  ILinkAction,
} from './ILinkAction';
import {
  PageIdentifiers,
} from '../../Enums/PageIdentifiers';

export const ArchivesLinkAction: ILinkAction = Object.freeze({
  type:    PageIdentifiers.Article,
  payload: {},
  value:   null,
});

export default ArchivesLinkAction;