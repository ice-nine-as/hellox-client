import {
  ILatestForumPostsAction,
} from '../App/ILatestForumPostsAction';
import {
  ILatestForumPostsFeed,
} from '../../Interfaces/ILatestForumPostsFeed';
import {
  isLatestForumPostsAction,
} from '../../TypeGuards/isLatestForumPostsAction';
import {
  TActionCreator,
} from './TActionCreator';

export const strings = {
  FORUM_POSTS_ACTION_INVALID:
    'The latestForumPostsAction argument passed to the createLatestForumPostsAction function did not ' +
    'meet the isLatestForumPostsAction type guard.',
};

export const createLatestForumPostsAction: TActionCreator<ILatestForumPostsAction> = (
  latestForumPostsAction: Readonly<ILatestForumPostsAction>,
  value: ILatestForumPostsFeed | null,
): ILatestForumPostsAction =>
{
  if (!isLatestForumPostsAction(latestForumPostsAction)) {
    throw new Error(strings.FORUM_POSTS_ACTION_INVALID);
  }

  return Object.freeze(Object.assign({}, latestForumPostsAction, {
    value,
  }));
}

export default createLatestForumPostsAction;