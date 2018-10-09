import {
  TSubstitutionKey,
} from '../TypeAliases/TSubstitutionKey';

export function isSubstitutionKey(maybe: any): maybe is TSubstitutionKey {
  return typeof maybe === 'string' && /^{{[^{}]+}}$/.test(maybe);
}

export default isSubstitutionKey;