import {
  AppActionTypes,
} from '../Enums/AppActionTypes';
import {
  ILanguageAction,
} from '../Actions/App/ILanguageAction';
import {
  isLanguage,
} from './isLanguage';

const strings = {
  ARGUMENT_INVALID:
    'The argument passed to the isLanguageAction type guard was not an ' +
    'object.',

  TYPE_INVALID:
    'The type property of the argument passed to the isLanguageAction type ' +
    'guard did not have the type AppActionTypes.Language.',

  VALUE_INVALID:
    'The value property of the argument passed ot the isLanguageAction tyoe ' +
    'guard did not meet the isLanguage type guard.',
};

export const isLanguageAction = (maybe: any, logErrors: boolean = false): maybe is ILanguageAction =>
{
  if (typeof maybe !== 'object' || maybe === null) {
    logErrors ? console.log(strings.ARGUMENT_INVALID) : null;
    return false;
  } else if (maybe.type !== AppActionTypes.Language) {
    logErrors ? console.log(strings.TYPE_INVALID) : null;
    return false;
  } else if (!isLanguage(maybe.value)) {
    logErrors ? console.log(strings.VALUE_INVALID) : null;
    return false;
  }

  return true;
};

export default isLanguageAction;