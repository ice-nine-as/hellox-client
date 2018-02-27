import {
  Store,
} from 'redux';
import {
  TStoreProps,
} from './TStoreProps';

export type TProviderContainerProps = {
  readonly store: Store<TStoreProps>;
}

export default TProviderContainerProps;