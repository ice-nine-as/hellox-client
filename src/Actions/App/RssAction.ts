import {
  AppActionTypes,
} from '../../Enums/AppActionTypes';
import {
  IRssAction,
} from './IRssAction';

// @ts-ignore
export const RssAction: IRssAction = Object.freeze({
  type:    AppActionTypes.Rss,
  feedKey: null,
  value:   null,
});

export default RssAction;