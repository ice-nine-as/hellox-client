import {
  PageIdentifiers,
} from '../Enums/PageIdentifiers';

export function isPageIdentifier(maybe: any): maybe is PageIdentifiers {
  return Object.values(PageIdentifiers).includes(maybe);
}

export default isPageIdentifier;