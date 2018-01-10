import {
  Store,
} from 'redux';
import {
  TAppProps,
} from './TAppProps';

export type TProviderContainerProps = {
  readonly store: Store<TAppProps>;
}

export default TProviderContainerProps;