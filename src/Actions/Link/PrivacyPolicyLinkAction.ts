import {
    ILinkAction,
  } from './ILinkAction';
  import {
    PageIdentifiers,
  } from '../../Enums/PageIdentifiers';
  
  export const PrivacyPolicyLinkAction: ILinkAction = Object.freeze({
    type: PageIdentifiers.PrivacyPolicy,
    payload: {},
    value: null,
  });
  
  export default PrivacyPolicyLinkAction;