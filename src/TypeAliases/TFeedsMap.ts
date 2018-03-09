import {
  IRssFeed,
} from '../Interfaces/IRssFeed';

export type TFeedsMap = {
  newsFullEnFeed:      IRssFeed | null;
  newsTeasersEnFeed:   IRssFeed | null;
  newsTitlesEnFeed:    IRssFeed | null;
  newsFullNoFeed:      IRssFeed | null;
  newsTeasersNoFeed:   IRssFeed | null;
  newsTitlesNoFeed:    IRssFeed | null;
  newsFullRuFeed:      IRssFeed | null;
  newsTeasersRuFeed:   IRssFeed | null;
  newsTitlesRuFeed:    IRssFeed | null;
  storyTemplateEnFeed: IRssFeed | null;
  storyTemplateNoFeed: IRssFeed | null;
  storyTEmplateRuFeed: IRssFeed | null;
};

export default TFeedsMap;