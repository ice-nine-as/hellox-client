import {
  ILinkAction,
} from '../Actions/Link/ILinkAction';
import {
  isLinkAction,
} from '../TypeGuards/isLinkAction';
import {
  TMakeLinkAction,
} from '../TypeAliases/TMakeLinkAction';

export const strings = {
  LINK_ACTION_INVALID:
    'The linkAction argument passed to the makeLinkAction function did not ' +
    'meet the isLinkAction type guard.',

  PAYLOAD_INVALID:
    'The payload argument passed to the makeLinkAction was not an object.',
};

export const makeLinkAction: TMakeLinkAction<ILinkAction> =
  (linkAction: ILinkAction, payload: object = {}): ILinkAction => {
    if (!isLinkAction(linkAction)) {
      throw new Error(strings.LINK_ACTION_INVALID);
    } else if (typeof payload !== 'object' || !payload) {
      throw new Error(strings.PAYLOAD_INVALID);
    }

    return Object.assign({}, linkAction, payload);
  }

  export default makeLinkAction;