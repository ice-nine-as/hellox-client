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
  let duplicates = 0;
  if (feedOne !== null && isRssFeed(feedOne)) {
    composed = feedOne;
    ids.push(...composed.items.map((item) => item.guid));
    if (feedTwo !== null && isRssFeed(feedTwo)) {
      const newItems = feedTwo.items.map((item) => {
        if (isRssPost(item) && ids.indexOf(item.guid) === -1) {
          ids.push(item.guid);
          return item;
        }

        return null;
      }).filter((aa) => aa !== null);

      duplicates += feedTwo.items.length - newItems.length;
      composed.items = composed.items
        .concat(newItems as Array<IRssPost>)
        .sort((itemOne, itemTwo) => {
          if (itemOne.guid > itemTwo.guid) {
            return -1;
          } else if (itemOne.guid < itemTwo.guid) {
            return 1;
          } else {
            console.error('Duplicate RSS item id found: ', itemOne.guid);
            return 0;
          }
        });
    }
  } else if (feedTwo !== null && isRssFeed(feedTwo)) {
    composed = feedTwo;
  }

  return {
    duplicates,
    feed: composed,
  };
};

export default composeFeeds;