import {
  ILinkAction,
} from '../Link/ILinkAction';
import {
  isLinkAction,
} from '../../TypeGuards/isLinkAction';
import {
  TMakeLinkAction,
} from '../../TypeAliases/TMakeLinkAction';

export const strings = {
  LINK_ACTION_INVALID:
    'The linkAction argument passed to the createLinkAction function did not ' +
    'meet the isLinkAction type guard.',

  PAYLOAD_INVALID:
    'The payload argument passed to the createLinkAction was not an object.',
};

export const createLinkAction: TMakeLinkAction<ILinkAction> =
  (linkAction: ILinkAction, payload: object = {}): ILinkAction => {
    if (!isLinkAction(linkAction)) {
      throw new Error(strings.LINK_ACTION_INVALID);
    } else if (typeof payload !== 'object' || !payload) {
      throw new Error(strings.PAYLOAD_INVALID);
    }

    return Object.freeze(Object.assign({}, linkAction, { payload, }));
  }

  export default createLinkAction;