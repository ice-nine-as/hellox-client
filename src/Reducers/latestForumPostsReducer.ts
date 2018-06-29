import {
  AppActionTypes,
} from '../Enums/AppActionTypes';
import {
  ILatestForumPostsAction,
} from '../Actions/App/ILatestForumPostsAction';
import {
  ILatestForumPostsFeed,
} from '../Interfaces/ILatestForumPostsFeed';
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

export const latestForumPostsReducer: TReducer<ILatestForumPostsFeed | null, ILatestForumPostsAction> =
  (previousState: ILatestForumPostsFeed | null = null,
    action: ILatestForumPostsAction): ILatestForumPostsFeed | null =>
{
  if (previousState !== null && !isLatestForumPostsFeed(previousState)) {
    throw new Error(strings.PREVIOUS_STATE_INVALID);
  }

  if (isAppAction(action) &&
      action.type === AppActionTypes.LatestForumPosts &&
      isLatestForumPostsFeed(action.value))
  {
    return action.value;
  }

  return previousState;
}

export default latestForumPostsReducer;