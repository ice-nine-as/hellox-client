import {
  Store,
} from 'redux';
import {
  Nullable,  
  RouteThunk,
} from 'redux-first-router';
import {
  TStoreProps,
} from './TStoreProps';

export type TClientStoreReturn = {
  store: Store<TStoreProps>;
  thunk: (store: Store<TStoreProps>) => Promise<Nullable<RouteThunk>>;
};

export default TClientStoreReturn;