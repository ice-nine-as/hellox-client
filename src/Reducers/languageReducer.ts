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
import {
  TReducer,
} from '../TypeAliases/TReducer';

export const strings = {
  PREVIOUS_STATE_INVALID:
    'The previousState argument passed to the languageReducer function did ' +
    'not meet the isLanguage type guard.',
};

export const languageReducer: TReducer<Languages, ILanguageAction> =
  (previousState: Languages = Languages.English,
    action: ILanguageAction): Languages =>
{
  if (!isLanguage(previousState)) {
    throw new Error(strings.PREVIOUS_STATE_INVALID);
  }

  if (action && isLanguageAction(action)) {
    return action.value;
  }
  
  return previousState;
}

export default languageReducer;