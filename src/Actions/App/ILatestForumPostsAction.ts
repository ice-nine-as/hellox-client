import {
  AppActionTypes,
} from '../../Enums/AppActionTypes';
import {
  IAppAction,
} from './IAppAction';
import {
  ILatestForumPostsFeed,
} from '../../Interfaces/ILatestForumPostsFeed';

export interface ILatestForumPostsAction extends IAppAction {
  readonly type:  AppActionTypes.LatestForumPosts;
  readonly value: ILatestForumPostsFeed | null;
}

export default ILatestForumPostsAction;