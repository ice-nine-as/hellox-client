import {
  Languages,
} from '../Enums/Languages';
import {
  TFeedsMap,
} from './TFeedsMap';

export type TLatestForumPostsStoreProps = {
  feeds:    TFeedsMap;
  language: Languages;
};

export default TLatestForumPostsStoreProps;