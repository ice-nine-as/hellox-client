import {
  IRssPost,
} from './IRssPost';

export interface IPodcastPost extends IRssPost {
  enclosures: Array<{
    url: string,
  }>,

  'itunes:episode': {
    '#': string,
  },

  'itunes:image': {
    '#': string,
  },

  meta: {
    image: {
      url: string,
    },
  },
}

export default IPodcastPost;