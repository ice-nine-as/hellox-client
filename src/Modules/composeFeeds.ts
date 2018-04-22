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
    ids.push(...ids.concat(composed.items.map((item) => item.guid)));
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
        .sort((itemOne, itemTwo) =>
        {
          const rawDateOne = (() => {
            if (itemOne &&
                (itemOne as any)['rss:pubdate'] &&
                (itemOne as any)['rss:pubdate']['#'])
            {
              return (itemOne as any)['rss:pubdate']['#'].replace(/-/g, ',');
            }

            return null;
          })();

          const rawDateTwo = (() => {
            if (itemTwo &&
                (itemTwo as any)['rss:pubdate'] &&
                (itemTwo as any)['rss:pubdate']['#'])
            {
              return (itemTwo as any)['rss:pubdate']['#'].replace(/-/g, ',');
            }

            return null;
          })();

          const dateOne = new Date(rawDateOne);
          const dateTwo = new Date(rawDateTwo);
          if (dateOne > dateTwo) {
            return -1;
          } else if (dateOne < dateTwo) {
            return 1;
          } else {
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