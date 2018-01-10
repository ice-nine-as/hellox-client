import {
  appReducer,
} from '../Reducers/appReducer';
import {
  TReducersMap,
} from '../TypeAliases/TReducersMap';

export function getDefaultAppReducers(): TReducersMap<boolean> {
  return {
    done:    appReducer,
    error:   appReducer,
    loading: appReducer,
  };
}

export default getDefaultAppReducers;