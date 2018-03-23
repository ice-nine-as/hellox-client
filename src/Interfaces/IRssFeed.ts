import {
  IRssPost,
} from './IRssPost';

export interface IRssFeed {
  type:           'rss';
  currentOffset?: number;
  items:          Array<IRssPost>;
  title:          string;
}

export default IRssFeed;