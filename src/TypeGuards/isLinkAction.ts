import {
  ILinkAction,
} from '../Actions/Link/ILinkAction';
import { isPageIdentifier } from './isPageIdentifier';

export function isLinkAction(maybe: any): maybe is ILinkAction {
  return typeof maybe === 'object' &&
    maybe &&
    isPageIdentifier(maybe.type) &&
    typeof maybe.payload === 'object' &&
    maybe.payload;
}

export default isLinkAction;