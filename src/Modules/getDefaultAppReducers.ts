import {
  appReducer,
} from '../Reducers/appReducer';
import {
  TReducersMap,
} from '../TypeAliases/TReducersMap';

export const getDefaultAppReducers = (): TReducersMap<boolean> => {
  return Object.freeze(Object.create({}, {
    done: {
      configurable: false,
      get: () => appReducer,
    },

    error: {
      configurable: false,
      get: () => appReducer,
    },

    loading: {
      configurable: false,
      get: () => appReducer,
    },
  }));
}

export default getDefaultAppReducers;