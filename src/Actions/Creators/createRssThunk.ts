import {
  composeFeeds,
} from '../../Modules/composeFeeds';
import {
  downloadFeed,
} from '../../Modules/downloadFeed';
import {
  IRssAction,
} from '../App/IRssAction';
import {
  IRssFeed,
} from '../../Interfaces/IRssFeed';
import {
  isFeedKey,
} from '../../TypeGuards/isFeedKey';
import {
  isRssFeed,
} from '../../TypeGuards/isRssFeed';
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
  TFeedsMap,
} from '../../TypeAliases/TFeedsMap';
import {
  TRssFeedGetter,
} from './TRssFeedGetter';

export const strings = {
  FEED_KEY_INVALID:
    'The feedKey argument passed to createRssThunk did not meet the ' +
    'isFeedKey type guard.',

  NO_SUBTYPE_URL:
    'There was no urlArg argument provided, nor a key in the FeedUrls enum ' +
    'which matched the subtype argument provided to createRssThunk.',

  FEED_RESPONSE_INVALID:
    'The response from the downloadFeed function was null, or did not meet ' +
    'the isRssFeed type guard.',
};

export const createRssThunk: TRssFeedGetter = ({
  composeWith = null,
  feedKey,
  id = null,
  offset = null,
  signal,
  urlArg = null,
}) => {
  if (!isFeedKey(feedKey)) {
    throw new Error(strings.FEED_KEY_INVALID);
  }

  const idValid = id && typeof id === 'string';

  const composeWithValid =
    composeWith &&
    typeof composeWith.currentOffset === 'number' &&
    composeWith.currentOffset >= 0;

  const offsetIsValid = typeof offset === 'number' && offset > 0;
  const composeWithOffset = composeWithValid ? composeWith!.currentOffset : 0;
  const realOffset = offsetIsValid ? offset : composeWithOffset;

  /* Return a thunk, a function which can be called later, and returns a
   * promise. */
  return async (dispatch: Dispatch<{}>): Promise<IRssAction> => {
    const maybeOffsetObj = offsetIsValid && !idValid ? { offset, } : {};
    const maybeSignalObj = signal ? { signal, } : {};
    const argObj = {
      ...maybeOffsetObj,
      ...maybeSignalObj,
      feedKey: feedKey as keyof TFeedsMap,
      id,
      urlArg,
    };

    let feed;
    try {
      feed = await downloadFeed(argObj);
    } catch (e) {
      if (e.name !== 'AbortError') {
        console.error(e);
        throw new Error(strings.FEED_RESPONSE_INVALID);
      }

      return Promise.reject(e);
    }

    if (!feed || !isRssFeed(feed)) {
      throw new Error(strings.FEED_RESPONSE_INVALID);
    }

    let finalFeedObj: IRssFeed | null = null;
    if (composeWith && isRssFeed(composeWith)) {
      /* The two feeds will be composed into a single feed. */
      const {
        duplicates,
        feed: _feed,
      } = composeFeeds(composeWith, feed);

      finalFeedObj = _feed!;

      /* Do not adjust the offset if only a single article was fetched. */
      if (!idValid) {
        /* Add the number of found non-duplicate items to the offset. */
        finalFeedObj.currentOffset = realOffset! + feed.items.length - duplicates;
      }
    } else {
      finalFeedObj = feed;
      if (idValid) {
        /* Do not adjust the offset if only a single article was fetched. */
        finalFeedObj.currentOffset = 0;
      } else {
        /* Add the number of items in the received feed to the offset. */
        finalFeedObj.currentOffset = realOffset! + finalFeedObj.items.length;
      }
    }

    return dispatch(createRssAction(RssAction, feedKey, finalFeedObj));
  };
};

export default createRssThunk;