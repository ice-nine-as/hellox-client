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
  rssReducer,
} from '../Reducers/rssReducer';
import {
  TReducersMap,
} from '../TypeAliases/TReducersMap';
import {
  viewportStateReducer,
} from '../Reducers/viewportStateReducer';

export const getDefaultAppReducers = (): TReducersMap<any> => {
  return Object.freeze({
    done:          doneReducer,
    error:         errorReducer,
    hamburgerOpen: hamburgerOpenReducer,
    language:      languageReducer,
    loading:       loadingReducer,
    rss:           rssReducer,
    viewportState: viewportStateReducer,
  });
}

export default getDefaultAppReducers;