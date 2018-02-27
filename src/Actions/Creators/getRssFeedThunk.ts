import {
  FeedUrls,
} from '../../Enums/FeedUrls';
import {
  AllHtmlEntities,
} from 'html-entities';
import {
  IRssAction,
} from '../App/IRssAction';
import {
  IRssFeed,
} from '../../Interfaces/IRssFeed';
import {
  isRssActionSubtype,
} from '../../TypeGuards/isRssActionSubtype';
import {
  createRssAction,
} from './createRssAction';
import {
  Dispatch,
} from 'redux';
import {
  RssAction,
} from '../App/RssAction';
import {
  TRssFeedGetter,
} from './TRssFeedGetter';

import * as htmlparser from 'htmlparser2';

const fetch = require('isomorphic-fetch');

declare module 'htmlparser2' {
  export class FeedHandler {
    constructor(callback: (err: any, feed: IRssFeed) => void, options?: object);
  }
}

export const strings = {
  SUBTYPE_INVALID:
    'The subtype argument passed to getRssFeed did not meet the ' +
    'isRssActionSubtype type guard.',

  NO_SUBTYPE_URL:
    'There was no key in the FeedUrls enum which matched the subtype ' +
    'argument provided to getRssFeed.',
};

export const getRssFeedThunk: TRssFeedGetter = (subtype) => {
  if (!isRssActionSubtype(subtype)) {
    throw new Error(strings.SUBTYPE_INVALID);
  }

  return async (dispatch: Dispatch<{}>): Promise<IRssAction> => {
    // We can dispatch both plain object actions and other thunks,
    // which lets us compose the asynchronous actions in a single flow.

    const urlKeys   = Object.keys(FeedUrls);
    const urlValues = (Object as any).values(FeedUrls);
    const url       = urlValues[urlKeys.indexOf(subtype)];
    if (!url) {
      throw new Error(strings.NO_SUBTYPE_URL);
    }

    const res = await fetch(url, {
      cache:       'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'omit',
      method:      'GET', // *GET, PUT, DELETE, etc.
    });

    const resText = await res.text();

    return new Promise<IRssAction>((resolve, reject) => {
      const handler = new htmlparser.FeedHandler((err, feed) => {
        if (err) {
          reject(err);
        }

        feed.items.forEach((item) => {
          item.description = new AllHtmlEntities().decode(item.description);
        });

        resolve(dispatch(createRssAction(RssAction, feed, subtype)));
      });

      const parser  = new htmlparser.Parser(handler, { xmlMode: true, });
      parser.write(resText);
      parser.end();
    });
  };
}