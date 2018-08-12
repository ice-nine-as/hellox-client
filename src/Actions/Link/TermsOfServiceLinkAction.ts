import {
    ILinkAction,
  } from './ILinkAction';
  import {
    PageIdentifiers,
  } from '../../Enums/PageIdentifiers';
  
  export const TermsOfServiceLinkAction: ILinkAction = Object.freeze({
    type: PageIdentifiers.TermsOfService,
    payload: {},
    value: null,
  });
  
  export default TermsOfServiceLinkAction;