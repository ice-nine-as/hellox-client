import {
  PageIdentifiers,
} from '../../Enums/PageIdentifiers';
import {
  Action as LinkAction,
} from 'redux-first-router';

export interface ILinkAction extends Readonly<LinkAction> {
  readonly type:    PageIdentifiers;
  readonly payload: object;
}

export default ILinkAction;