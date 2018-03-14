import {
  FeedDetailLevels,
} from '../Enums/FeedDetailLevels';
import {
  Languages,
} from '../Enums/Languages';
import {
  TFeedsMap,
} from './TFeedsMap';

export type TLatestNewsOwnProps = {
  detailLevel: FeedDetailLevels;
  language:    Languages;
  feeds:       TFeedsMap;
};

export default TLatestNewsOwnProps;