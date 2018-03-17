import {
  Languages,
} from '../Enums/Languages';
import {
  Location,
} from 'redux-first-router';
import {
  TFeedsMap,
} from './TFeedsMap';

export type TArchivesProps = {
  feeds:    TFeedsMap;
  language: Languages;
  location: Location;
};

export default TArchivesProps;