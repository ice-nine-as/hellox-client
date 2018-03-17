import {
  AppActionTypes,
} from '../../Enums/AppActionTypes';
import {
  IRssAction,
} from './IRssAction';
import {
  RssActionSubtypes,
} from '../../Enums/RssActionSubtypes';

// @ts-ignore
export const RssAction: IRssAction = Object.freeze({
  type:    AppActionTypes.Rss,
  feedKey: null,
  value:   null,
  subtype: RssActionSubtypes.Compose,
});

export default RssAction;