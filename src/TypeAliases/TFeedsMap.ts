import {
  FeedKeys,
} from '../Enums/FeedKeys';
import {
  IRssFeed,
} from '../Interfaces/IRssFeed';

export type TFeedsMap = {
  [FeedKeys.NewsFullEn]:           IRssFeed | null,
  [FeedKeys.NewsFullNo]:           IRssFeed | null,
  [FeedKeys.NewsFullRu]:           IRssFeed | null,
  [FeedKeys.NewsTeasersEn]:        IRssFeed | null,
  [FeedKeys.NewsTeasersNo]:        IRssFeed | null,
  [FeedKeys.NewsTeasersRu]:        IRssFeed | null,
  [FeedKeys.NewsTitlesEn]:         IRssFeed | null,
  [FeedKeys.NewsTitlesNo]:         IRssFeed | null,
  [FeedKeys.NewsTitlesRu]:         IRssFeed | null,
  [FeedKeys.StoryTemplateEnPartA]: IRssFeed | null,
  [FeedKeys.StoryTemplateNoPartA]: IRssFeed | null,
  [FeedKeys.StoryTemplateRuPartA]: IRssFeed | null,
  [FeedKeys.StoryTemplateEnPartB]: IRssFeed | null,
  [FeedKeys.StoryTemplateNoPartB]: IRssFeed | null,
  [FeedKeys.StoryTemplateRuPartB]: IRssFeed | null,
  [FeedKeys.StoryTemplateEnPartC]: IRssFeed | null,
  [FeedKeys.StoryTemplateNoPartC]: IRssFeed | null,
  [FeedKeys.StoryTemplateRuPartC]: IRssFeed | null,
};

export default TFeedsMap;