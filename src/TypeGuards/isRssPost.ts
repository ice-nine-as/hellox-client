import {
  IRssPost,
} from '../Interfaces/IRssPost';
import {
  isDate,
} from 'util';

export const isRssPost = (maybe: any): maybe is IRssPost => {
  return typeof maybe === 'object' &&
    maybe !== null &&
    typeof maybe.description === 'string' &&
    maybe.description.length > 0 &&
    typeof maybe.id === 'string' &&
    typeof maybe.link === 'string' &&
    maybe.link.length > 0 &&
    isDate(maybe.pubDate) &&
    typeof maybe.title === 'string' &&
    maybe.title.length > 0;
};

export default isRssPost;