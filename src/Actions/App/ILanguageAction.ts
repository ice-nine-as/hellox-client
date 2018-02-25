import {
  AppActionTypes,
} from '../../Enums/AppActionTypes';
import {
  IAppAction,
} from './IAppAction';
import {
  Languages,
} from '../../Enums/Languages';

export interface ILanguageAction extends IAppAction {
  readonly type:  AppActionTypes.Language;
  readonly value: Languages;
}

export default ILanguageAction;