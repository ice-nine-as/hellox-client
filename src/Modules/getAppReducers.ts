import {
  doneReducer,
} from '../Reducers/doneReducer';
import {
  errorReducer,
} from '../Reducers/errorReducer';
import {
  hamburgerOpenReducer,
} from '../Reducers/hamburgerOpenReducer';
import {
  IAction,
} from '../Actions/IAction';
import {
  languageReducer,
} from '../Reducers/languageReducer';
import {
  loadingReducer,
} from '../Reducers/loadingReducer';
import {
  feedsReducer,
} from '../Reducers/Feed/feedReducer';
import {
  TReducersMap,
} from '../TypeAliases/TReducersMap';

export const getAppReducers = (): Readonly<TReducersMap<any, IAction>> => {
  return Object.freeze({
    done:          doneReducer,
    error:         errorReducer,
    hamburgerOpen: hamburgerOpenReducer,
    language:      languageReducer,
    loading:       loadingReducer,
    feeds:         feedsReducer,
  });
}

export default getAppReducers;