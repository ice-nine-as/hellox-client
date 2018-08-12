import {
  FeedKeys,
} from '../Enums/FeedKeys';
import {
  FeedUrls,
} from '../Enums/FeedUrls';
/*import {
  AllHtmlEntities,
} from 'html-entities';*/
import {
  IPodcastFeed,
} from '../Interfaces/IPodcastFeed';
import {
  IRssFeed,
} from '../Interfaces/IRssFeed';
/*import {
  isRssFeed,
} from '../TypeGuards/isRssFeed';*/
import {
  TFeedsMap,
} from '../TypeAliases/TFeedsMap';

import {
  // @ts-ignore
  default as FeedParser,
} from 'feedparser';

require('es6-promise').polyfill();
require('isomorphic-fetch');
require('abortcontroller-polyfill/dist/polyfill-patch-fetch');

export const strings = {
  URL_INVALID:
    'Neither an urlArg property nor valid feedKey property was provided in ' +
    'the argument object. If the id argument was provided, the only allowed ' +
    'FeedKey value is NewsFull.',

  FEED_INVALID:
    'The feed was fetched from the provided URL, but it did not meet the ' +
    'isRssFeed type guard when transformed to a JS object.',

  FEED_KEY_INVALID_WITH_ID:
    'An id argument was provided in the argument object, but the feed key ' +
    'was not one of the SingleArticle values, and therefore is incompatible ' +
    'with single article lookups.',
};

// @ts-ignore
export const downloadFeed = async ({
  feedKey,
  id,
  offset,
  signal,
  urlArg,
}: {
  feedKey: keyof TFeedsMap,
  id?:     string | null | undefined,
  offset?: number | null | undefined,
  signal?: AbortSignal,
  urlArg?: string | null | undefined,
}): Promise<IRssFeed> =>
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
      if (feedKey === FeedKeys.NewsFull) {
        return FeedUrls.NewsSingleArticle.replace(':id', id);
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
    
  return new Promise<IRssFeed>(async (resolve, reject) => {
    let res;
    try {
      const maybeSignalObj = signal ? { signal, } : {};
      res = await fetch(fullUrl, Object.assign({}, maybeSignalObj /* allows aborting */, {
        cache:       'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'omit',
        method:      'GET', // *GET, PUT, DELETE, etc.
      }));
    } catch (e) {
      console.error(`Fetch failed for ${fullUrl} request. Signal was ` +
                    `${signal && signal.aborted ? 'aborted' : 'not aborted'}.`);
      reject(e);
    }

    if (!res) {
      return;
    }

    if (res.status !== 200) {
      reject(new Error(`Problem fetching feed. Status is ${res.status}.`));
    }

    const resText = await res.text();

    const feed: IRssFeed | IPodcastFeed = {
      type: 'rss',
      title: 'Not provided',
      items: [],
    };

    const options = {};
    var feedparser = new FeedParser(options);
    feedparser.on('error', (error: Error) => {
      if (error) {
        console.error(error);
        reject(error);
      }
    });

    feedparser.on('readable', function () {
      // @ts-ignore
      const __this = this;
      const stream = __this as FeedParser; // `this` is `feedparser`, which is a stream
      //var meta = stream.meta; // **NOTE** the "meta" is always available in the context of the feedparser instance
      let item;

      while (item = stream.read()) {
        feed.title = item.meta.title;
        if ('itunes:image' in item && '#' in item['itunes:image']) {
          item.itunesImage = item['itunes:image']['#'];
        }
        
        if ('itunes:summary' in item && '#' in item['itunes:summary']) {
          item.itunesSummary = item['itunes:summary']['#'];
        }

        if ('itunes:episode' in item && '#' in item['itunes:episode']) {
          item.itunesEpisode = item['itunes:episode']['#'];
        }

        feed.items.push(item);
      }
    });
  
    /* Write to the stream. */
    feedparser._write(resText, 'utf-8', () => {
      /* Resolve the promise, with the constructed feed as the value. This
       * /must/ be performed here, as opposed to in the readable event,
       * because feeds with no content (e.g. at the tail of the feed) do not
       * fire the readable event. */ 
      resolve(feed);
    });
  });
};