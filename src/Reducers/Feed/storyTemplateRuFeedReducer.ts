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
  RssActionSubtypes,
} from '../../Enums/RssActionSubtypes';
import {
  TReducer,
} from '../../TypeAliases/TReducer';

export const strings = {
  PREVIOUS_STATE_INVALID:
    'The previousState argument passed to the storyTemplateRuFeedReducer ' +
    'function was not null, nor did it meet the isRssFeed type guard.',
};

export const storyTemplateRuFeedReducer: TReducer<IRssFeed | null> = (
  previousState: IRssFeed | null = null,
  action: IRssAction): IRssFeed | null =>
{
  if (previousState !== null && !isRssFeed(previousState)) {
    throw new Error(strings.PREVIOUS_STATE_INVALID);
  }

  if (isRssAction(action) &&
      action.subtype === RssActionSubtypes.StoryTemplateRu)
  {
    return action.value;
  }

  return previousState;
};

export default storyTemplateRuFeedReducer;