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

export interface ILatestForumTopicsAction extends IAppAction {
  readonly type:  AppActionTypes.LatestForumTopics;
  readonly value: ILatestForumTopicsFeed | null;
}

export default ILatestForumTopicsAction;