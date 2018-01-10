import {
  ILinkAction,
} from './ILinkAction';
import {
  PageIdentifiers,
} from '../../Enums/PageIdentifiers';

export const TalkLinkAction: ILinkAction = {
  type: PageIdentifiers.Talk,
  payload: {},
};

export default TalkLinkAction;