import {
  Languages,
} from '../Enums/Languages';
import {
  TFeedsMap,
} from './TFeedsMap';

export type TLatestNewsStoreProps = {
  language: Languages;
  feeds:    TFeedsMap;
};

export default TLatestNewsStoreProps;