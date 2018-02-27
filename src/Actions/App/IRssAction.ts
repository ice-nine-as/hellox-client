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
  RssActionSubtypes,
} from '../../Enums/RssActionSubtypes';

export interface IRssAction extends IAppAction {
  readonly type:     AppActionTypes.Rss;
  readonly subtype?: RssActionSubtypes;
  readonly value:    IRssFeed | null;
}

export default IRssAction;