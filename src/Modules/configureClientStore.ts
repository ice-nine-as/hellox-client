import {
  getDefaultReducers,
} from './getDefaultReducers';
import {
  getDefaultRoutesMap,
} from './getDefaultRoutesMap';
import {
  History,
} from 'history';
import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  StoreEnhancerStoreCreator,
} from 'redux';
import {
  connectRoutes,
  RoutesMap,
} from 'redux-first-router';
import {
  TAppProps,
} from '../TypeAliases/TAppProps';
import {
  TClientStoreReturn,
} from '../TypeAliases/TClientStoreReturn';

import thunkMiddleware from 'redux-thunk';

export function configureClientStore(
  history:        History,
  preloadedState: TAppProps = {} as TAppProps,
  routesMap:      RoutesMap = getDefaultRoutesMap()): TClientStoreReturn
{
  const {
    enhancer,
    middleware,
    reducer: locationReducer,
    thunk,
  } = connectRoutes(history, routesMap);

  const rootReducer = combineReducers<TAppProps>({
    ...getDefaultReducers(),
    location: locationReducer,
  });

  const middlewares = applyMiddleware(thunkMiddleware, middleware);
  const enhancers   = compose<StoreEnhancerStoreCreator<TAppProps>>(enhancer, middlewares);

  const store = createStore<TAppProps>(
    rootReducer,
    preloadedState,
    enhancers);

  return {
    store,
    thunk,
  };
}

export default configureClientStore;