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
  TRssFeedGetter,
} from './TRssFeedGetter';

export const strings = {
  FEED_KEY_INVALID:
    'The feedKey argument passed to getRssFeed did not meet the ' +
    'isRssActionSubtype type guard.',

  NO_SUBTYPE_URL:
    'There was no url argument provided, nor a key in the FeedUrls enum ' +
    'which matched the subtype argument provided to getRssFeed.',
};

export const getRssFeedThunk: TRssFeedGetter = (feedKey, offset = 0, urlArg = null, composeWith = null) => {
  if (!isFeedKey(feedKey)) {
    throw new Error(strings.FEED_KEY_INVALID);
  }

  return async (dispatch: Dispatch<{}>): Promise<IRssAction> => {
    // We can dispatch both plain object actions and other thunks,
    // which lets us compose the asynchronous actions in a single flow.
    
    const argObj = {
      feedKey,
      offset,
      urlArg,
    };

    const feed = await downloadFeed(argObj);

    const finalFeedObj = composeWith && isRssFeed(composeWith) ?
      composeFeeds(composeWith, feed) :
      {
        feed,
        offset,
      };

    if (finalFeedObj.offset! > 0) {
      /* Dispatch offset action with offset and feedKey. */
    }

    return dispatch(createRssAction(RssAction, feedKey, finalFeedObj.feed));
  };
};

export default getRssFeedThunk;