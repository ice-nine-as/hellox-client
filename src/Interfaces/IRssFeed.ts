import {
  IRssPost,
} from './IRssPost';

export interface IRssFeed {
  type:  'rss';
  items: Array<IRssPost>;
  title: string;
}

export default IRssFeed;