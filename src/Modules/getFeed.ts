import {
  FeedDetailLevels,
} from '../Enums/FeedDetailLevels';
import {
  FeedKeys,
} from '../Enums/FeedKeys';
import {
  IRssFeed,
} from '../Interfaces/IRssFeed';
import {
  isLanguage,
} from '../TypeGuards/isLanguage';
import {
  Languages,
} from '../Enums/Languages';
import {
  TFeedsMap,
} from '../TypeAliases/TFeedsMap';

export const strings = {
  LANGUAGE_INVALID:
    'The language argument provided to getFeedItem did not meet the ' +
    'isLanguage type guard.',

  TYPE_INVALID:
    'The type argument provided to getFeedItem was neither "newsItem" nor ' +
    '"storyTemplate".',

  FEEDS_INVALID:
    'The feeds argument provided to getFeedItem was not an object.',

  FEED_INVALID:
    'One of the items in the feeds array argument did not meet the ' +
    'isRssFeed type guard.',
};

export const getFeed = (
  type: 'newsItem' | 'storyTemplate',
  language: Languages,
  feeds: TFeedsMap,
  detailLevel?: FeedDetailLevels): { key: FeedKeys, feed: IRssFeed | null, } =>
{
  let feedKey: FeedKeys | null = null;
  if (!isLanguage(language)) {
    throw new Error(strings.LANGUAGE_INVALID);
  } else if (type !== 'newsItem' && type !== 'storyTemplate') {
    throw new Error(strings.TYPE_INVALID);
  } else if (!feeds || typeof feeds !== 'object') {
    throw new Error(strings.FEEDS_INVALID);
  }

  if (type === 'newsItem') {
    if (detailLevel === FeedDetailLevels.Full) {
      if (language === Languages.Norwegian) {
        feedKey = FeedKeys.NewsFullNo;
      } else if (language === Languages.Russian) {
        feedKey = FeedKeys.NewsFullRu;
      } else {
        feedKey = FeedKeys.NewsFullEn;
      }
    } else if (detailLevel === FeedDetailLevels.Titles) {
      if (language === Languages.Norwegian) {
        feedKey = FeedKeys.NewsTitlesNo;
      } else if (language === Languages.Russian) {
        feedKey = FeedKeys.NewsTitlesRu;
      } else {
        feedKey = FeedKeys.NewsTitlesEn;
      }
    } else {
      if (language === Languages.Norwegian) {
        feedKey = FeedKeys.NewsTeasersNo;
      } else if (language === Languages.Russian) {
        feedKey = FeedKeys.NewsTeasersRu;
      } else {
        feedKey = FeedKeys.NewsTeasersEn;
      }
    }
  } else {
    if (language === Languages.Norwegian) {
      feedKey = FeedKeys.StoryTemplateNo;
    } else if (language === Languages.Russian) {
      feedKey = FeedKeys.StoryTemplateRu;
    } else {
      feedKey = FeedKeys.StoryTemplateEn;
    }
  }

  return {
    key: feedKey,
    feed: feeds[feedKey] || null,
  };
};

export default getFeed;