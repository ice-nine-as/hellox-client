import {
  createLatestForumPostsAction,
} from './createLatestForumPostsAction';
import {
  ILatestForumPostsAction,
} from '../App/ILatestForumPostsAction';
import {
  isLatestForumPostsFeed,
} from '../../TypeGuards/isLatestForumPostsFeed';
import {
  LatestForumPostsAction,
} from '../App/LatestForumPostsAction';
import {
  Dispatch,
} from 'redux';

import 'isomorphic-fetch';

export const strings = {
  FEED_RESPONSE_INVALID:
    'The response from the server was null.',
    
  FEED_RESPONSE_MALFORMED:
    'The response from the server was not properly formatted ' +
    'JSON, or did not meet the isLatestForumPostsFeed type guard.',

  EMPTY_FEED_ERROR:
    'The response from the server function produced a feed with no ' +
    'items.',
};

export const createLatestForumPostsThunk = ({
  // @ts-ignore
  signal,
}) => {
  /* Return a thunk, a function which can be called later, and returns a
   * promise. */
  return async (dispatch: Dispatch<{}>): Promise<ILatestForumPostsAction> => {
    let feed;
    try {
      const res = await fetch('https://forum.hellox.me/latest.json');
      try {
        const data = await res.json();
        feed = data;
      } catch (e) {
        console.error(e);
        throw new Error(strings.FEED_RESPONSE_MALFORMED);
      }
    } catch (e) {
      if (e.name !== 'AbortError') {
        console.error(e);
        throw new Error(strings.FEED_RESPONSE_INVALID);
      }

      return Promise.reject(e);
    }

    if (!feed || !isLatestForumPostsFeed(feed)) {
      throw new Error(strings.FEED_RESPONSE_MALFORMED);
    }

    if (feed.topic_list.topics.length === 0) {
      return Promise.reject(strings.EMPTY_FEED_ERROR);
    }

    return dispatch(createLatestForumPostsAction(LatestForumPostsAction, feed));
  };
};

export default createLatestForumPostsThunk;