import {
  composeFeeds,
} from '../../Functions/composeFeeds';
import {
  downloadFeed,
} from '../../Functions/downloadFeed';
import {
  IAction,
} from '../IAction';
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

  EMPTY_FEED_ERROR:
    'The response from the downloadFeed function produced a feed with no ' +
    'items.',
};

export const createRssThunk: TRssFeedGetter = ({
  composeWith = null,
  feedKey,
  id = null,
  signal,
  urlArg = null,
}) => {
  if (!isFeedKey(feedKey)) {
    throw new Error(strings.FEED_KEY_INVALID);
  }

  /* Return a thunk, a function which can be called later, and returns a
   * promise. */
  return async (dispatch: Dispatch<IAction>): Promise<IRssAction> => {
    const maybeSignalObj = signal ? { signal, } : {};
    const argObj = Object.assign({}, maybeSignalObj, {
      feedKey: feedKey as keyof TFeedsMap,
      id,
      urlArg,
    });

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
        feed: _feed,
      } = composeFeeds(composeWith, feed);

      finalFeedObj = _feed!;
    } else {
      finalFeedObj = feed;
    }

    if (!finalFeedObj.items || !finalFeedObj.items.length) {
      return Promise.reject(strings.EMPTY_FEED_ERROR);
    }

    return dispatch(createRssAction(RssAction, feedKey, finalFeedObj));
  };
};

export default createRssThunk;