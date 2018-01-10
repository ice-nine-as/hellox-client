import {
  ILinkAction,
} from './ILinkAction';
import {
  PageIdentifiers,
} from '../../Enums/PageIdentifiers';

export const AboutLinkAction: ILinkAction = Object.freeze({
  type: PageIdentifiers.About,
  payload: {},
});

export default AboutLinkAction;