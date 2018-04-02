import {
  AppActionTypes,
} from '../../Enums/AppActionTypes';
import {
  IAppAction,
} from './IAppAction';
import {
  IRssFeed,
} from '../../Interfaces/IRssFeed';
import {
  FeedKeys,
} from '../../Enums/FeedKeys';

export interface IRssAction extends IAppAction {
  readonly type:     AppActionTypes.Rss;
  readonly feedKey?: FeedKeys;
  readonly value:    IRssFeed | null;
}

export default IRssAction;