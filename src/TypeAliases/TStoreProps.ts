import {
  Languages,
} from '../Enums/Languages';
import {
  LocationState,
} from 'redux-first-router';
import {
  TFeedsMap,
} from './TFeedsMap';
import {
  ViewportStates,
} from '../Enums/ViewportStates';

export type TStoreProps = {
  done:          boolean,
  error:         boolean,
  hamburgerOpen: boolean,
  language:      Languages,
  loading:       boolean,
  location:      LocationState;
  feeds:         TFeedsMap,
  viewportState: ViewportStates,
};

export default TStoreProps;