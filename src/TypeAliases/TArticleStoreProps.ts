import {
  Languages,
} from '../Enums/Languages';
import {
  TFeedsMap,
} from './TFeedsMap';
import {
  Location,
} from 'redux-first-router';

export type TArticleStoreProps = {
  feeds:    TFeedsMap;
  language: Languages;
  location: Location;
};

export default TArticleStoreProps;