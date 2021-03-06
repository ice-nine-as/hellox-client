import {
  IRssAction,
} from '../Actions/App/IRssAction';
import {
  IRssFeed,
} from '../Interfaces/IRssFeed';
import {
  TFeedsMap,
} from './TFeedsMap';

export type TLatestNewsDispatchProps = {
  getNewsFeed(feedKey: keyof TFeedsMap, composeWith?: IRssFeed | null): Promise<IRssAction>,
  getPodcasts(): Promise<IRssAction>,
};

export default TLatestNewsDispatchProps;