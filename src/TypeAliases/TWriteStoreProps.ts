import {
  Languages,
} from '../Enums/Languages';
import {
  Location,
} from 'redux-first-router';
import {
  TFeedsMap,
} from './TFeedsMap';

export type TWriteStoreProps = {
  feeds:    TFeedsMap;
  language: Languages;
  location: Location;
};

export default TWriteStoreProps;