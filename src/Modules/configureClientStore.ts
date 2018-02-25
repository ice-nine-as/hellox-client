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
  createStore,
} from 'redux';
import {
  composeWithDevTools,
} from 'redux-devtools-extension';
import {
  connectRoutes,
  RoutesMap,
} from 'redux-first-router';
import {
  TAppOwnProps,
} from '../TypeAliases/TAppOwnProps';
import {
  TClientStoreReturn,
} from '../TypeAliases/TClientStoreReturn';

import thunkMiddleware from 'redux-thunk';

export function configureClientStore(
  history:        History,
  preloadedState: TAppOwnProps = {} as TAppOwnProps,
  routesMap:      RoutesMap = getDefaultRoutesMap()): TClientStoreReturn
{
  const {
    enhancer,
    middleware,
    reducer: locationReducer,
    thunk,
  } = connectRoutes(history, routesMap);

  const rootReducer = combineReducers<TAppOwnProps>({
    ...getDefaultReducers(),
    location: locationReducer,
  });

  const middlewares = applyMiddleware(thunkMiddleware, middleware);
  const enhancers   = composeWithDevTools(enhancer, middlewares);

  const store = createStore<TAppOwnProps>(
    rootReducer,
    preloadedState,
    enhancers);

  return {
    store,
    thunk,
  };
}

export default configureClientStore;