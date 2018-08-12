/* For forum.hellox.me/latest.json. Deprecated in favor of downloadFeed using /latest.rss. */

import {
  ILatestForumPostsAction,
} from '../App/ILatestForumPostsAction';
import {
  ILatestForumTopicsFeed,
} from '../../Interfaces/ILatestForumTopicsFeed';
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
  value: ILatestForumTopicsFeed | null,
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