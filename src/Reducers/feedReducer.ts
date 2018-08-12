import {
  IRssAction,
} from '../Actions/App/IRssAction';
import {
  IRssFeed,
} from '../Interfaces/IRssFeed';
import {
  isRssAction,
} from '../TypeGuards/isRssAction';
import {
  isRssFeed,
} from '../TypeGuards/isRssFeed';
import {
  TFeedsMap,
} from '../TypeAliases/TFeedsMap';
import {
  TReducer,
} from '../TypeAliases/TReducer';

export const strings = {
  PREVIOUS_STATE_INVALID:
    'The previousState argument passed to the storyTemplateEnFeedReducer ' +
    'function was not null, nor did it meet the isRssFeed type guard.',
};

export const feedReducer: TReducer<IRssFeed | null, IRssAction> = function (
  previousState: IRssFeed | null = null,
  action:        IRssAction
): IRssFeed | null
{
  // @ts-ignore
  const __this: { key: keyof TFeedsMap, } = this;

  if (previousState !== null && !isRssFeed(previousState)) {
    throw new Error(strings.PREVIOUS_STATE_INVALID);
  }

  if (action &&
      isRssAction(action) &&
      __this &&
      __this.key === action.feedKey)
  {
    return action.value;
  }

  return previousState;
};

export default feedReducer;