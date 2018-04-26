import {
  Languages,
} from '../Enums/Languages';
import {
  TFeedsMap,
} from './TFeedsMap';

export type TQuoteDisplayStoreProps = {
  feeds:    TFeedsMap,
  language: Languages,
};

export default TQuoteDisplayStoreProps;