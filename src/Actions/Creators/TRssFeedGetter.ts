import {
  IRssAction,
} from '../App/IRssAction';
import {
  FeedKeys,
} from '../../Enums/FeedKeys';
import {
  Dispatch,
} from 'redux';
import {
  IRssFeed,
} from '../../Interfaces/IRssFeed';

/* Used with redux-thunk. */
export type TRssFeedGetter =
  (feedKey: FeedKeys, offset?: number | null, urlArg?: string | null, composeWith?: IRssFeed | null) =>
    (dispatch: Dispatch<{}>) =>
      Promise<IRssAction>;

export default TRssFeedGetter;