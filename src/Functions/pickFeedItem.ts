import {
  IRssFeed,
} from '../Interfaces/IRssFeed';
import {
  IRssPost,
} from '../Interfaces/IRssPost';
import {
  isRssFeed,
} from '../TypeGuards/isRssFeed';

export const strings = {
  ID_INVALID:
    'The id argument provided to pickFeedItem was not a string, or was empty.',

  FEED_INVALID:
    'The feed argument did not meet the isRssFeed type guard.',
};

export const pickFeedItem = (
  id:   string,
  feed: IRssFeed | null): IRssPost | null =>
{
  if (feed === null) {
    return null;
  }

  if (typeof id !== 'string' || !id) {
    throw new Error(strings.ID_INVALID);
  } else if (!isRssFeed(feed)) {
    throw new Error(strings.FEED_INVALID);
  }
  
  return feed.items.find((item) => item.guid === id) || null;
};

export default pickFeedItem;