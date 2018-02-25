import {
  Store,
} from 'redux';
import {
  TAppOwnProps,
} from './TAppOwnProps';

export type TProviderContainerProps = {
  readonly store: Store<TAppOwnProps>;
}

export default TProviderContainerProps;