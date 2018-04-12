import {
  Languages,
} from '../Enums/Languages';
import {
  Location,
} from 'redux-first-router';
import {
  TFeedsMap,
} from './TFeedsMap';

export type TPodcastsStoreProps = {
  feeds: TFeedsMap,
  language: Languages,
  location: Location,
};

export default TPodcastsStoreProps;