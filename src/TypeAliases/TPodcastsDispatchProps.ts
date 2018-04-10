import {
  IRssAction,
} from '../Actions/App/IRssAction';
import {
  IRssFeed,
} from '../Interfaces/IRssFeed';
import {
  TFeedsMap,
} from './TFeedsMap';

export type TPodcastsDispatchProps = {
  getPodcastFeed(feedKey: keyof TFeedsMap, offset?: number, composeWith?: IRssFeed | null): Promise<IRssAction>,
}

export default TPodcastsDispatchProps;