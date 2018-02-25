import {
  IRssFeed,
} from '../Interfaces/IRssFeed';

export const strings = {
  ARGUMENT_INVALID:
    'The argument passed to isRssFeed was not an object.',

  TYPE_INVALID:
    'The type property of the argument passed to isRssFeed was not "rss".',

  ID_INVALID:
    'The id property of the argument passed to isRssFeed was not a string.',

  TITLE_INVALID:
    'The title property of the argument passed to isRssFeed was not a ' +
    'string, or was empty.',

  DESCRIPTION_INVALID:
    'The description property of the argument passed to isRssFeed was not a ' +
    'string.',

  ITEMS_INVALID:
    'The items property of the argument passed to isRssFeed was not an array.',
};

export const isRssFeed = (maybe: any): maybe is IRssFeed => {
  if (typeof maybe !== 'object' || maybe === null) {
    console.log(strings.ARGUMENT_INVALID);
    return false;
  }
  
  if (maybe.type !== 'rss') {
    console.log(strings.TYPE_INVALID);
    return false;
  }

  if (typeof maybe.id !== 'string') {
    console.log(strings.ID_INVALID);
    return false;
  } 
  
  if (typeof maybe.title !== 'string' || maybe.title.length === 0) {
    console.log(strings.TITLE_INVALID);
    return false;
  }
    
  if (typeof maybe.description !== 'string') {
    console.log(strings.DESCRIPTION_INVALID);
    return false;
  }

  if (!Array.isArray(maybe.items)) {
    console.log(strings.ITEMS_INVALID);
    return false;
  }

  return true;
};

export default isRssFeed;