import {
  IRssPost,
} from './IRssPost';

export interface IRssFeed {
  type:        'rss',
  id:          string;
  title:       string;
  description: string;
  items:       Array<IRssPost>;
}

export default IRssFeed;