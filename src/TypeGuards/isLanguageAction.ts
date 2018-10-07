import {
  AppActionTypes,
} from '../Enums/AppActionTypes';
import {
  ILanguageAction,
} from '../Actions/App/ILanguageAction';
import {
  isAppAction,
} from './isAppAction';
import {
  isLanguage,
} from './isLanguage';

export const isLanguageAction = (maybe: any): maybe is ILanguageAction =>
{
  if (!isAppAction(maybe)) {
    return false;
  } else if (maybe.type !== AppActionTypes.Language) {
    return false;
  } else if (!isLanguage(maybe.value)) {
    return false;
  }

  return true;
};

export default isLanguageAction;