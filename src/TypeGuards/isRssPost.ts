import {
  IRssPost,
} from '../Interfaces/IRssPost';
import {
  isDate,
} from 'util';

export const isRssPost = (maybe: any): maybe is IRssPost => {
  return Boolean(
    typeof maybe === 'object' &&
    maybe &&
    typeof maybe.description === 'string' &&
    maybe.description &&
    typeof maybe.guid === 'string' &&
    maybe.guid &&
    typeof maybe.link === 'string' &&
    maybe.link &&
    isDate(maybe.pubDate)
  );
};

export default isRssPost;