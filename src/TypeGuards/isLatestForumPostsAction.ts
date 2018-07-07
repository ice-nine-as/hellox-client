import {
  AppActionTypes,
} from '../Enums/AppActionTypes';
import {
  ILatestForumPostsAction,
} from '../Actions/App/ILatestForumPostsAction';
import {
  isAppAction,
} from '../TypeGuards/isAppAction';
import {
  isLatestForumPostsFeed,
} from './isLatestForumPostsFeed';

export function isLatestForumPostsAction(maybe: any): maybe is ILatestForumPostsAction {
  return typeof maybe === 'object' &&
    maybe !== null &&
    isAppAction(maybe) &&
    maybe.type === AppActionTypes.LatestForumPosts &&
    (maybe.value === null || isLatestForumPostsFeed(maybe.value));
}

export default isLatestForumPostsAction;