import {
  IRssAction,
} from '../Actions/App/IRssAction';
import {
  TFeedsMap,
} from './TFeedsMap';

export type TQuoteDisplayDispatchProps = {
  getQuotesFeed(key: keyof TFeedsMap): Promise<IRssAction>,
};

export default TQuoteDisplayDispatchProps;