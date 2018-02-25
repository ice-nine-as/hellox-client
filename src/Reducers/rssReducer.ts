import {
  AppActionTypes,
} from '../Enums/AppActionTypes';
import {
  IRssAction,
} from '../Actions/App/IRssAction';
import {
  isAppAction,
} from '../TypeGuards/isAppAction';
import {
  isRssFeed,
} from '../TypeGuards/isRssFeed';
import {
  TReducer,
} from '../TypeAliases/TReducer';
import { IRssFeed } from '../Interfaces/IRssFeed';

export const strings = {
  PREVIOUS_STATE_INVALID:
    'The previousState argument passed to the rssReducer function was not ' +
    'null, nor did it meet the isRssFeed type guard.',
};

export const rssReducer: TReducer<IRssFeed | null> = (
  previousState: IRssFeed | null = null,
  action: IRssAction,
): IRssFeed | null => {
  if (previousState !== null && !isRssFeed(previousState)) {
    throw new Error(strings.PREVIOUS_STATE_INVALID);
  }

  if (isAppAction(action) &&
    action.type === AppActionTypes.Rss &&
    isRssFeed(action.value))
  {
    return action.value;
  }

  return previousState;
};

export default rssReducer;