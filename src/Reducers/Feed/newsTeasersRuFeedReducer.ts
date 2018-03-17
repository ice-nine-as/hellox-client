import {
  FeedKeys,
} from '../../Enums/FeedKeys';
import {
  IRssAction,
} from '../../Actions/App/IRssAction';
import {
  IRssFeed,
} from '../../Interfaces/IRssFeed';
import {
  isRssAction,
} from '../../TypeGuards/isRssAction';
import {
  isRssFeed,
} from '../../TypeGuards/isRssFeed';
import {
  TReducer,
} from '../../TypeAliases/TReducer';

export const strings = {
  PREVIOUS_STATE_INVALID:
    'The previousState argument passed to the newsTeasersRuFeedReducer ' +
    'function was not null, nor did it meet the isRssFeed type guard.',
};

export const newsTeasersRuFeedReducer: TReducer<IRssFeed | null, IRssAction> = (
  previousState: IRssFeed | null = null,
  action: IRssAction,
): IRssFeed | null => {
  if (previousState !== null && !isRssFeed(previousState)) {
    throw new Error(strings.PREVIOUS_STATE_INVALID);
  }
  
  if (isRssAction(action) && action.feedKey === FeedKeys.NewsTeasersRu) {
    return action.value;
  }

  return previousState;
};

export default newsTeasersRuFeedReducer;