import {
  IRssFeed,
} from '../Interfaces/IRssFeed';
import {
  IRssPost,
} from '../Interfaces/IRssPost';
import {
  isRssFeed,
} from '../TypeGuards/isRssFeed';
import {
  isRssPost,
} from '../TypeGuards/isRssPost';

export const composeFeeds = (feedOne: IRssFeed | null, feedTwo: IRssFeed | null) =>  {
  let composed: IRssFeed | null = null;
  const ids: Array<string> = [];
  let offset = 0;
  if (feedOne !== null && isRssFeed(feedOne)) {
    composed = feedOne;
    ids.push(...composed.items.map((item) => item.id));
    const newItems = feedTwo!.items.map((item) => {
      if (isRssPost(item) && ids.indexOf(item.id) === -1) {
        ids.push(item.id);
        return item;
      }

      return null;
    }).filter((aa) => aa !== null);

    offset += feedTwo!.items.length - newItems.length;
    composed.items = composed.items.concat(newItems as Array<IRssPost>);
  } else if (feedTwo !== null && isRssFeed(feedTwo)) {
    composed = feedTwo;
  }

  return {
    feed: composed,
    offset,
  };
};

export default composeFeeds;