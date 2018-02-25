import {
  IAppAction,
} from '../Actions/App/IAppAction';
import {
  Languages,
} from '../Enums/Languages';

export type TLanguageButtonDispatchProps = {
  switchLanguage(lang: Languages): IAppAction;
};

export default TLanguageButtonDispatchProps;