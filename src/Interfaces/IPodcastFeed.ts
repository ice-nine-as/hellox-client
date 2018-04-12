import {
  IPodcastPost,
} from './IPodcastPost';
import {
  IRssFeed,
} from './IRssFeed';

export interface IPodcastFeed extends IRssFeed {
  itunesImage:   string,
  itunesSummary: string,
  items:         Array<IPodcastPost>,
}

export default IPodcastFeed;