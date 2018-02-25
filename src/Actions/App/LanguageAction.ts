import {
  AppActionTypes,
} from '../../Enums/AppActionTypes';
import {
  Languages,
} from '../../Enums/Languages';
import {
  ILanguageAction,
} from './ILanguageAction';

// @ts-ignore
export const LanguageAction: ILanguageAction = Object.freeze({
  type: AppActionTypes.Language,
  value: Languages.English,
});

export default LanguageAction;