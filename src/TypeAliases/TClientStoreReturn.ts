import {
  Store,
} from 'redux';
import {
  Nullable,  
  RouteThunk,
} from 'redux-first-router';
import {
  TAppProps,
} from './TAppProps';

export type TClientStoreReturn = {
  store: Store<TAppProps>;
  thunk: (store: Store<TAppProps>) => Promise<Nullable<RouteThunk>>;
};

export default TClientStoreReturn;