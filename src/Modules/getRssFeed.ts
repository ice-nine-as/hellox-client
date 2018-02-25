import {
  cmsRssUrl,
} from '../Properties/cmsRssUrl';
import {
  AllHtmlEntities,
} from 'html-entities';
import {
  IRssAction,
} from '../Actions/App/IRssAction';
import {
  IRssFeed,
} from '../Interfaces/IRssFeed';
import {
  makeRssAction,
} from '../Modules/makeRssAction';
import {
  RssAction,
} from '../Actions/App/RssAction';

import * as htmlparser from 'htmlparser2';

const fetch = require('isomorphic-fetch');

declare module 'htmlparser2' {
  export class FeedHandler {
    constructor(callback: (err: any, feed: IRssFeed) => void, options?: object);
  }
}

export const getRssFeed: () => (dispatch: Function) => Promise<IRssAction> = () => {
  return async (dispatch: Function): Promise<IRssAction> => {
    // We can dispatch both plain object actions and other thunks,
    // which lets us compose the asynchronous actions in a single flow.

    const res = await fetch(cmsRssUrl, {
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

        resolve(dispatch(makeRssAction(RssAction, feed)));
      });

      const parser  = new htmlparser.Parser(handler, { xmlMode: true, });
      parser.write(resText);
      parser.end();
    });
  };
}