import {
  FeedKeys,
} from '../Enums/FeedKeys';
import {
  FeedUrls,
} from '../Enums/FeedUrls';
import {
  AllHtmlEntities,
} from 'html-entities';
import {
  IRssFeed,
} from '../Interfaces/IRssFeed';
import {
  isRssFeed,
} from '../TypeGuards/isRssFeed';

import * as htmlparser from 'htmlparser2';
declare module 'htmlparser2' {
  export class FeedHandler {
    constructor(callback: (err: any, feed: IRssFeed) => void, options?: object);
  }
}

const fetch = require('isomorphic-fetch');

export const strings = {
  URL_INVALID:
    'Neither an urlArg property nor valid feedKey property was provided in ' +
    'the argument object.',

  FEED_INVALID:
    'The feed was fetched from the provided URL, but it did not meet the ' +
    'isRssFeed type guard when transformed to a JS object.',
};

export const downloadFeed = async ({
  feedKey,
  offset,
  urlArg,
}: {
  feedKey?: FeedKeys,
  offset?:  number | null,
  urlArg?:  string | null,
}) => {
  const url = urlArg || feedKey ? FeedUrls[feedKey!] : null;
  if (!url) {
    throw new Error(strings.URL_INVALID);
  }

  const fullUrl = typeof offset === 'number' && !Number.isNaN(offset) ?
      `${url}/?offset=${offset}` :
      url;

  const res = await fetch(fullUrl, {
    cache:       'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'omit',
    method:      'GET', // *GET, PUT, DELETE, etc.
  });

  const resText = await res.text();

  return new Promise<IRssFeed>((resolve, reject) => {
    const handler = new htmlparser.FeedHandler((err, feed) => {
      if (err) {
        reject(err);
      }

      if (!isRssFeed(feed)) {
        throw new Error(strings.FEED_INVALID);
      }

      feed.items.forEach((item) => {
        item.description = new AllHtmlEntities().decode(item.description);
      });

      resolve(feed);
    });

    const parser  = new htmlparser.Parser(handler, { xmlMode: true, });
    parser.write(resText);
    parser.end();
  });
};