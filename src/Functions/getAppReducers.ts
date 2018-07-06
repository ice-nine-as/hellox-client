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
  latestForumPostsReducer,
} from '../Reducers/latestForumPostsReducer';
import {
  loadingReducer,
} from '../Reducers/loadingReducer';
import {
  feedsReducer,
} from '../Reducers/feedsReducer';
import {
  TReducersMap,
} from '../TypeAliases/TReducersMap';

export const getAppReducers = (): Readonly<TReducersMap<any, IAction>> => {
  return Object.freeze({
    done:             doneReducer,
    error:            errorReducer,
    hamburgerOpen:    hamburgerOpenReducer,
    language:         languageReducer,
    latestForumPosts: latestForumPostsReducer,
    loading:          loadingReducer,
    feeds:            feedsReducer,
  });
}

export default getAppReducers;