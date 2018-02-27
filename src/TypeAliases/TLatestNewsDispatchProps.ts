import {
  IRssAction,
} from '../Actions/App/IRssAction';
import {
  TFeedsMap,
} from './TFeedsMap';

export type TLatestNewsDispatchProps = {
  getNewsFeed(feedKey: keyof TFeedsMap): IRssAction;
};

export default TLatestNewsDispatchProps;