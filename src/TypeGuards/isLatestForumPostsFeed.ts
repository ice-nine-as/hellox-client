import {
  ILatestForumPostsFeed,
} from '../Interfaces/ILatestForumPostsFeed';

export function isLatestForumPostsFeed(maybe: any): maybe is ILatestForumPostsFeed {
  if (typeof maybe !== 'object' || maybe === null) {
    return false;
  }
  
  if (typeof maybe.topic_list !== 'object' || maybe.topic_list === null) {
    return false;
  }

  if (!Array.isArray(maybe.topic_list.topics)) {
    return false;
  }

  return true;
}

export default isLatestForumPostsFeed;