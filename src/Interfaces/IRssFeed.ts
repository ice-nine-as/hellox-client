import {
  IRssPost,
} from './IRssPost';

export interface IRssFeed {
  type:  'rss';
  title: string;
  items: Array<IRssPost>;
}

export default IRssFeed;