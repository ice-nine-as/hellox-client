import {
  ILanguageAction,
} from '../Actions/App/ILanguageAction';
import {
  isLanguage,
} from '../TypeGuards/isLanguage';
import {
  isLanguageAction,
} from '../TypeGuards/isLanguageAction';
import {
  Languages,
} from '../Enums/Languages';

export const strings = {
  LANGUAGE_ACTION_INVALID:
    'The LanguageAction argument passed to the makeLanguageAction function did not ' +
    'meet the isLanguageAction type guard.',

  VALUE_INVALID:
    'The value argument passed to the makeLanguageAction function was not null, ' +
    'nor did it meet the isLanguageFeed type guard.',
};

export const makeLanguageAction =
  (languageAction: ILanguageAction, value: Languages): ILanguageAction =>
{
  if (!isLanguageAction(languageAction)) {
    throw new Error(strings.LANGUAGE_ACTION_INVALID);
  } else if (!isLanguage(value)) {
    throw new Error(strings.VALUE_INVALID);
  }

  return Object.assign({}, languageAction, { value, });
}

export default makeLanguageAction;