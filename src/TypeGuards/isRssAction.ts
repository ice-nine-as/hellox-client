import {
  AppActionTypes,
} from '../Enums/AppActionTypes';
import {
  IRssAction,
} from '../Actions/App/IRssAction';
import {
  isAppAction,
} from './isAppAction';
import {
  isRssFeed,
} from './isRssFeed';

export function isRssAction(maybe: any): maybe is IRssAction {
  return Boolean(
    isAppAction(maybe) &&
    maybe.type === AppActionTypes.Rss &&
    (maybe.value === null || isRssFeed(maybe.value))
  );
}

export default isRssAction;