import {
  Languages,
} from '../Enums/Languages';
import {
  TFeedsMap,
} from './TFeedsMap';

export type TLatestNewsOwnProps = {
  language: Languages;
  feeds:    TFeedsMap; 
};

export default TLatestNewsOwnProps;