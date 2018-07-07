import {
  IForumTopic,
} from '../Interfaces/IForumTopic';

export function isForumTopic(maybe: any): maybe is IForumTopic {
  if (typeof maybe !== 'object' || maybe === null) {
    return false;
  }

  if (!(maybe.id > 1)) {
    return false;
  }

  if (typeof maybe.title !== 'string' || !maybe.title) {
    return false;
  }

  if (typeof maybe.slug !== 'string' || !maybe.slug) {
    return false;
  }

  if (typeof maybe.image_url !== 'string' || !maybe.image_url) {
    return false;
  }

  return true;
}

export default isForumTopic