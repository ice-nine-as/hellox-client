import {
  Languages,
} from '../Enums/Languages';
import {
  TFeedsMap,
} from './TFeedsMap';
import {
  Location,
} from 'redux-first-router';

export type TPodcastStoreProps = {
  feeds:    TFeedsMap;
  language: Languages;
  location: Location;
};

export default TPodcastStoreProps;