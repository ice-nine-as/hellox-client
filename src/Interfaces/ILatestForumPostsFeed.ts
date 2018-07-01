import {
  IForumPost,
} from './IForumPost';

export interface ILatestForumTopicsFeed {
  latest_posts: Array<IForumPost>;
}

export default ILatestForumTopicsFeed;