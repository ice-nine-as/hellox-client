import {
  ILinkAction,
} from './ILinkAction';
import {
  PageIdentifiers,
} from '../../Enums/PageIdentifiers';

export const ArticleLinkAction: ILinkAction = Object.freeze({
  type:    PageIdentifiers.Article,
  payload: {},
  value:   null,
});

export default ArticleLinkAction;