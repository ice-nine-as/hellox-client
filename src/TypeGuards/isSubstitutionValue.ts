import {
  TSubstitutionValue,
} from '../TypeAliases/TSubstitutionValue';

export function isSubstitutionValue(maybe: any): maybe is TSubstitutionValue {
  /* Is a string. */
  return typeof maybe === 'string' &&
    /* Has content. */
    maybe.length > 0 &&
    /* Does not contain { or }. */
    /^[^{}]+$/.test(maybe);
}

export default isSubstitutionValue;