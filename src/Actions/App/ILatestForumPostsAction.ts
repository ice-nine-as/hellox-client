/* For forum.hellox.me/latest.json. Deprecated in favor of latest.rss.*/

import {
  AppActionTypes,
} from '../../Enums/AppActionTypes';
import {
  IAppAction,
} from './IAppAction';
import {
  ILatestForumTopicsFeed,
} from '../../Interfaces/ILatestForumTopicsFeed';

export interface ILatestForumPostsAction extends IAppAction {
  readonly type:  AppActionTypes.LatestForumPosts;
  readonly value: ILatestForumTopicsFeed | null;
}

export default ILatestForumPostsAction;