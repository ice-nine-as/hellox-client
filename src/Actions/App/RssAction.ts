import {
  AppActionTypes,
} from '../../Enums/AppActionTypes';
import {
  IRssAction,
} from './IRssAction';

// @ts-ignore
export const RssAction: Readonly<IRssAction> = Object.freeze({
  type:  AppActionTypes.Rss,
  value: null,
});

export default RssAction;