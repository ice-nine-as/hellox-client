import {
  IRssFeed,
} from '../Interfaces/IRssFeed';

export type TFeedsMap = {
  newsFullEnFeed:      IRssFeed | null;
  newsTitlesEnFeed:    IRssFeed | null;
  newsFullNoFeed:      IRssFeed | null;
  newsTitlesNoFeed:    IRssFeed | null;
  newsFullRuFeed:      IRssFeed | null;
  newsTitlesRuFeed:    IRssFeed | null;
  storyTemplateEnFeed: IRssFeed | null;
  storyTemplateNoFeed: IRssFeed | null;
  storyTEmplateRuFeed: IRssFeed | null;
};

export default TFeedsMap;