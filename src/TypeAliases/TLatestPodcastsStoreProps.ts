import {
  Languages,
} from '../Enums/Languages';
import {
  TFeedsMap,
} from './TFeedsMap';

export type TLatestPodcastsStoreProps = {
  feeds:    TFeedsMap,
  language: Languages,
};

export default TLatestPodcastsStoreProps;