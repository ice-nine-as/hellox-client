import {
  ILinkAction,
} from './ILinkAction';
import {
  PageIdentifiers,
} from '../../Enums/PageIdentifiers';

export const TalkLinkAction: ILinkAction = Object.freeze({
  type: PageIdentifiers.Talk,
  payload: {},
  value: null,
});

export default TalkLinkAction;