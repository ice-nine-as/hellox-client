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
import {
  TFeedsMap,
} from '../TypeAliases/TFeedsMap';

import * as htmlparser from 'htmlparser2';
declare module 'htmlparser2' {
  export class FeedHandler {
    constructor(callback: (err: any, feed: IRssFeed) => void, options?: object);
  }
}

require('es6-promise').polyfill();
require('isomorphic-fetch');

export const strings = {
  URL_INVALID:
    'Neither an urlArg property nor valid feedKey property was provided in ' +
    'the argument object. If the id argument was provided, the only allowed ' +
    'FeedKey values are NewsFullEn, NewsFullNo, and NewsFullRu.',

  FEED_INVALID:
    'The feed was fetched from the provided URL, but it did not meet the ' +
    'isRssFeed type guard when transformed to a JS object.',

  FEED_KEY_INVALID_WITH_ID:
    'An id argument was provided in the argument object, but the feed key ' +
    'was not one of the SingleArticle values, and therefore is incompatible ' +
    'with single article lookups.',
};

export const downloadFeed = async ({
  feedKey,
  id,
  offset,
  urlArg,
}: {
  feedKey: keyof TFeedsMap,
  id?:     string | null | undefined,
  offset?: number | null | undefined,
  urlArg?: string | null | undefined,
}) =>
{
  let ignoreOffset = false;
  const url = ((feedKey, id, urlArg) => {
    if (urlArg && typeof urlArg === 'string') {
      /* A custom URL has been provided. */
      return urlArg;
    } else if (id && typeof id === 'string') {
      ignoreOffset = true;

      /* Only a single article is being requested. Single article feed URLs
       * require a run-time parameter, so they must be run through
       * String.prototype.replace before actually being used. */
      if (feedKey === FeedKeys.NewsFullEn) {
        return FeedUrls.NewsSingleArticleEn.replace(':id', id);
      } else if (feedKey === FeedKeys.NewsFullNo) {
        return FeedUrls.NewsSingleArticleNo.replace(':id', id);
      } else if (feedKey === FeedKeys.NewsFullRu) {
        return FeedUrls.NewsSingleArticleRu.replace(':id', id);
      } else {
        throw new Error(strings.FEED_KEY_INVALID_WITH_ID);
      }
    } else {
      /* Try to match the key to a complete URL. If not found, return null. */
      // @ts-ignore
      return FeedUrls[feedKey] || null;
    }
  })(feedKey, id, urlArg);

  if (!url) {
    throw new Error(strings.URL_INVALID);
  }

  const offsetIsValid =
    !ignoreOffset &&
    typeof offset === 'number' &&
    offset > 0 &&
    offset % 1 === 0;

  const fullUrl = offsetIsValid ?
    `${url}/?offset=${offset}` :
    url;

  const res = await fetch(fullUrl, {
    cache:       'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'omit',
    method:      'GET', // *GET, PUT, DELETE, etc.
  });

  if (res.status !== 200) {
    return null;
  }

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

    const parser = new htmlparser.Parser(handler, { xmlMode: true, });
    parser.write(resText);
    parser.end();
  });
};