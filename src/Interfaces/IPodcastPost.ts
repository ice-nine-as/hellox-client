import {
  IRssPost,
} from './IRssPost';

export interface IPodcastPost extends IRssPost {
  enclosures: Array<{
    url: string;
  }>;

  itunesEpisode?: string;
  itunesImage?:   string;
  itunesSummary?: string;

  meta: {
    image: {
      url: string;
    };
  };

  title: string;
}

export default IPodcastPost;