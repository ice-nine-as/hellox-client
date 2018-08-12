import {
  AppActionTypes,
} from '../Enums/AppActionTypes';
import {
  IRssAction,
} from '../Actions/App/IRssAction';
import {
  isRssFeed,
} from './isRssFeed';

export function isRssAction(maybe: any): maybe is IRssAction {
  return typeof maybe === 'object' &&
    maybe !== null &&
    maybe.type === AppActionTypes.Rss &&
    (maybe.value === null || isRssFeed(maybe.value));
}

export default isRssAction;