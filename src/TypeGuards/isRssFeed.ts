import {
  IRssFeed,
} from '../Interfaces/IRssFeed';

export const isRssFeed = (maybe: any): maybe is IRssFeed => {
  if (typeof maybe !== 'object' || !maybe) {
    return false;
  }
  
  if (maybe.type !== 'rss') {
    return false;
  }

  if (typeof maybe.title !== 'string') {
    return false;
  }

  if (!maybe.title) {
    return false;
  }
    
  if (!Array.isArray(maybe.items)) {
    return false;
  }

  return true;
};

export default isRssFeed;