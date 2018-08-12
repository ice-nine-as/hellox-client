import {
  AppActionTypes,
} from '../Enums/AppActionTypes';
import {
  ILatestForumTopicsAction,
} from '../Actions/App/ILatestForumTopicsAction';
import {
  ILatestForumTopicsFeed,
} from '../Interfaces/ILatestForumTopicsFeed';
import {
  isAppAction,
} from '../TypeGuards/isAppAction';
import {
  isLatestForumPostsFeed,
} from '../TypeGuards/isLatestForumPostsFeed';
import {
  TReducer,
} from '../TypeAliases/TReducer';

export const strings = {
  PREVIOUS_STATE_INVALID:
    'The previousState argument passed to the latestForumPostsReducer ' +
    'function did not meet the isLatestForumPostsFeed type guard.',
};

export const latestForumPostsReducer: TReducer<ILatestForumTopicsFeed | null, ILatestForumTopicsAction> =
  (previousState: ILatestForumTopicsFeed | null = null,
    action: ILatestForumTopicsAction): ILatestForumTopicsFeed | null =>
{
  if (previousState !== null && !isLatestForumPostsFeed(previousState)) {
    throw new Error(strings.PREVIOUS_STATE_INVALID);
  }

  if (action &&
      isAppAction(action) &&
      action.type === AppActionTypes.LatestForumPosts &&
      isLatestForumPostsFeed(action.value))
  {
    return action.value;
  }

  return previousState;
}

export default latestForumPostsReducer;