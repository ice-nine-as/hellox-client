import {
  FeedKeys,
} from '../Enums/FeedKeys';
import {
  IRssFeed,
} from '../Interfaces/IRssFeed';

export type TFeedsMap = {
  [FeedKeys.NewsFull]:             IRssFeed | null,
  [FeedKeys.NewsTeasers]:          IRssFeed | null,
  [FeedKeys.NewsTitles]:           IRssFeed | null,

  [FeedKeys.Podcast]:              IRssFeed | null,

  [FeedKeys.StoryTemplateEnPartA]: IRssFeed | null,
  [FeedKeys.StoryTemplateEnPartB]: IRssFeed | null,
  [FeedKeys.StoryTemplateEnPartC]: IRssFeed | null,
  [FeedKeys.StoryTemplateNoPartA]: IRssFeed | null,
  [FeedKeys.StoryTemplateNoPartB]: IRssFeed | null,
  [FeedKeys.StoryTemplateNoPartC]: IRssFeed | null,
  [FeedKeys.StoryTemplateRuPartA]: IRssFeed | null,
  [FeedKeys.StoryTemplateRuPartB]: IRssFeed | null,
  [FeedKeys.StoryTemplateRuPartC]: IRssFeed | null,

  [FeedKeys.TeamMembers]:          IRssFeed | null,
};

export default TFeedsMap;