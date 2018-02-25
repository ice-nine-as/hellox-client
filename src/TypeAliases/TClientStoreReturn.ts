import {
  Store,
} from 'redux';
import {
  Nullable,  
  RouteThunk,
} from 'redux-first-router';
import {
  TAppOwnProps,
} from './TAppOwnProps';

export type TClientStoreReturn = {
  store: Store<TAppOwnProps>;
  thunk: (store: Store<TAppOwnProps>) => Promise<Nullable<RouteThunk>>;
};

export default TClientStoreReturn;