import {
  PageIdentifiers,
} from '../Pages/PageIdentifiers';

export function isPageIdentifier(maybe: any): maybe is PageIdentifiers {
  return Object.values(PageIdentifiers).includes(maybe);
}

export default isPageIdentifier;