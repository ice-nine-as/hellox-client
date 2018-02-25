import {
  AppActionTypes,
} from '../../Enums/AppActionTypes';
import {
  IAppAction,
} from './IAppAction';
import {
  IRssFeed,
} from '../../Interfaces/IRssFeed';

export interface IRssAction extends IAppAction {
  readonly type:  AppActionTypes.Rss;
  readonly value: IRssFeed | null;
}

export default IRssAction;