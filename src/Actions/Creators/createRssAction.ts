import {
  IRssAction,
} from '../App/IRssAction';
import {
  IRssFeed,
} from '../../Interfaces/IRssFeed';
import {
  isRssAction,
} from '../../TypeGuards/isRssAction';
import {
  isRssActionSubtype,
} from '../../TypeGuards/isRssActionSubtype';
import {
  isRssFeed,
} from '../../TypeGuards/isRssFeed';
import {
  RssActionSubtypes,
} from '../../Enums/RssActionSubtypes';
import {
  TActionCreator,
} from './TActionCreator';

export const strings = {
  RSS_ACTION_INVALID:
    'The rssAction argument passed to the makeRssAction function did not ' +
    'meet the isRssAction type guard.',

  VALUE_INVALID:
    'The value argument passed to the makeRssAction function was not null, ' +
    'nor did it meet the isRssFeed type guard.',

  RSS_ACTION_SUBTYPE_INVALID:
    'The subtype argument passed to the makeRssAction function did not meet ' +
    'the isRssActionSubtype type guard.',

};

export const createRssAction: TActionCreator =
  (rssAction: IRssAction,
   value: IRssFeed | null,
   subtype: RssActionSubtypes): IRssAction =>
{
  if (!isRssAction(rssAction)) {
    throw new Error(strings.RSS_ACTION_INVALID);
  } else if (value !== null && !isRssFeed(value)) {
    throw new Error(strings.VALUE_INVALID);
  } else if (!isRssActionSubtype(subtype)) {
    throw new Error(strings.RSS_ACTION_SUBTYPE_INVALID);
  }

  return Object.assign({}, rssAction, {
    subtype,
    value,
  });
}

export default createRssAction;