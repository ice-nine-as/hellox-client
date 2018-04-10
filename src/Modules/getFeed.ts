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
  StoryGeneratorParts,
} from '../StoryGenerator/Enums/StoryGeneratorParts';
import {
  TFeedsMap,
} from '../TypeAliases/TFeedsMap';

export const strings = {
  LANGUAGE_INVALID:
    'The language argument provided to getFeed did not meet the ' +
    'isLanguage type guard.',

  TYPE_INVALID:
    'The type argument provided to getFeed was neither "newsItem" nor ' +
    '"podcast" nor "storyTemplate".',

  FEEDS_INVALID:
    'The feeds argument provided to getFeed was not an object.',

  FEED_INVALID:
    'One of the items in the feeds array argument did not meet the ' +
    'isRssFeed type guard.',

  DETAIL_LEVEL_INVALID:
    'The detailLevel argument was not a member of FeedDetailLevels.',

  STORY_PART_INVALID:
    'The storyPart argument prop was not A, B, or C.',
};

export const getFeed = ({
  type,
  language,
  feeds,
  detailLevel,
  storyPart,
}: {
  type:         'newsItem' | 'podcast' | 'storyTemplate',
  language:     Languages,
  feeds:        TFeedsMap,
  detailLevel?: FeedDetailLevels,
  storyPart?:   StoryGeneratorParts,
}):
{
  feed: IRssFeed | null,
  key:  keyof TFeedsMap,
} =>
{
  let feedKey: keyof TFeedsMap;
  if (!isLanguage(language)) {
    throw new Error(strings.LANGUAGE_INVALID);
  } else if (type !== 'newsItem' &&
             type !== 'podcast' &&
             type !== 'storyTemplate')
  {
    throw new Error(strings.TYPE_INVALID);
  } else if (!feeds || typeof feeds !== 'object') {
    throw new Error(strings.FEEDS_INVALID);
  } else if (detailLevel &&
             detailLevel !== FeedDetailLevels.Full &&
             detailLevel !== FeedDetailLevels.Teaser &&
             detailLevel !== FeedDetailLevels.Title)
  {
    throw new Error(strings.DETAIL_LEVEL_INVALID);
  }

  if (type === 'newsItem') {
    if (detailLevel === FeedDetailLevels.Full) {
      feedKey = FeedKeys.NewsFull;
    } else if (detailLevel === FeedDetailLevels.Title) {
      feedKey = FeedKeys.NewsTitles;
    } else {
      feedKey = FeedKeys.NewsTeasers;
    }
  } else if (type === 'podcast') {
    feedKey = FeedKeys.Podcast;
  } else {
    /* Story template */
    const _storyPart = storyPart as string;
    if (/^a$/i.test(_storyPart)) {
      if (language === Languages.Norwegian) {
        feedKey = FeedKeys.StoryTemplateNoPartA;
      } else if (language === Languages.Russian) {
        feedKey = FeedKeys.StoryTemplateRuPartA;
      } else {
        feedKey = FeedKeys.StoryTemplateEnPartA;
      }
    } else if (/^b$/i.test(_storyPart)) {
      if (language === Languages.Norwegian) {
        feedKey = FeedKeys.StoryTemplateNoPartB;
      } else if (language === Languages.Russian) {
        feedKey = FeedKeys.StoryTemplateRuPartB;
      } else {
        feedKey = FeedKeys.StoryTemplateEnPartB;
      }
    } else if (/^c$/i.test(_storyPart)) {
      if (language === Languages.Norwegian) {
        feedKey = FeedKeys.StoryTemplateNoPartC;
      } else if (language === Languages.Russian) {
        feedKey = FeedKeys.StoryTemplateRuPartC;
      } else {
        feedKey = FeedKeys.StoryTemplateEnPartC;
      }
    } else {
      throw new Error(strings.STORY_PART_INVALID);
    }
  }

  return {
    key:  feedKey,
    feed: feedKey ? feeds[feedKey] || null : null,
  };
};

export default getFeed;