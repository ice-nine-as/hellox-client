import {
  AppActionTypes,
} from '../../Enums/AppActionTypes';
import {
  ILatestForumPostsAction,
} from './ILatestForumPostsAction';

// @ts-ignore
export const LatestForumPostsAction: ILatestForumPostsAction = Object.freeze({
  type:  AppActionTypes.LatestForumPosts,
  value: null,
});

export default LatestForumPostsAction;