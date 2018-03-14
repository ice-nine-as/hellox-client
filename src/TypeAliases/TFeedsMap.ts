import {
  FeedKeys,
} from '../Enums/FeedKeys';
import {
  IRssFeed,
} from '../Interfaces/IRssFeed';

export type TFeedsMap = {
  [FeedKeys.NewsFullEn]:      IRssFeed | null;
  [FeedKeys.NewsFullNo]:      IRssFeed | null;
  [FeedKeys.NewsFullRu]:      IRssFeed | null;
  [FeedKeys.NewsTeasersEn]:   IRssFeed | null;
  [FeedKeys.NewsTeasersNo]:   IRssFeed | null;
  [FeedKeys.NewsTeasersRu]:   IRssFeed | null;
  [FeedKeys.NewsTitlesEn]:    IRssFeed | null;
  [FeedKeys.NewsTitlesNo]:    IRssFeed | null;
  [FeedKeys.NewsTitlesRu]:    IRssFeed | null;
  [FeedKeys.StoryTemplateEn]: IRssFeed | null;
  [FeedKeys.StoryTemplateNo]: IRssFeed | null;
  [FeedKeys.StoryTemplateRu]: IRssFeed | null;
};

export default TFeedsMap;