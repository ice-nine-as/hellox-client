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
import {
  viewportStateReducer,
} from '../Reducers/viewportStateReducer';

export const getDefaultAppReducers = (): Readonly<TReducersMap<any>> => {
  return Object.freeze({
    done:          doneReducer,
    error:         errorReducer,
    hamburgerOpen: hamburgerOpenReducer,
    language:      languageReducer,
    loading:       loadingReducer,
    feeds:         feedsReducer,
    viewportState: viewportStateReducer,
  });
}

export default getDefaultAppReducers;