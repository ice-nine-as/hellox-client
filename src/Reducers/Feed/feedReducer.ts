import {
  FeedKeys,
} from '../../Enums/FeedKeys';
import {
  newsFullEnFeedReducer,
} from './newsFullEnFeedReducer';
import {
  newsTeasersEnFeedReducer,
} from './newsTeasersEnFeedReducer';
import {
  newsTitlesEnFeedReducer,
} from './newsTitlesEnFeedReducer';
import {
  newsFullNoFeedReducer,
} from './newsFullNoFeedReducer';
import {
  newsTeasersNoFeedReducer,
} from './newsTeasersNoFeedReducer';
import {
  newsTitlesNoFeedReducer,
} from './newsTitlesNoFeedReducer';
import {
  newsFullRuFeedReducer,
} from './newsFullRuFeedReducer';
import {
  newsTeasersRuFeedReducer,
} from './newsTeasersRuFeedReducer';
import {
  newsTitlesRuFeedReducer,
} from './newsTitlesRuFeedReducer';
import {
  storyTemplateEnFeedReducer,
} from './storyTemplateEnFeedReducer';
import {
  storyTemplateNoFeedReducer,
} from './storyTemplateNoFeedReducer';
import {
  storyTemplateRuFeedReducer,
} from './storyTemplateRuFeedReducer';
import {
  combineReducers,
} from 'redux';
import {
  TReducer,
} from '../../TypeAliases/TReducer';
import {
  TFeedsMap,
} from '../../TypeAliases/TFeedsMap';

/* Ignoring here due to a weird type mismatch between our Action types and
 * Redux's AnyAction type. */
// @ts-ignore
export const feedsReducer: TReducer<TFeedsMap> = combineReducers({
  [FeedKeys.NewsFullEn]:      newsFullEnFeedReducer,
  [FeedKeys.NewsFullNo]:      newsFullNoFeedReducer,
  [FeedKeys.NewsFullRu]:      newsFullRuFeedReducer,
  [FeedKeys.NewsTeasersEn]:   newsTeasersEnFeedReducer,
  [FeedKeys.NewsTeasersNo]:   newsTeasersNoFeedReducer,
  [FeedKeys.NewsTeasersRu]:   newsTeasersRuFeedReducer,
  [FeedKeys.NewsTitlesEn]:    newsTitlesEnFeedReducer,
  [FeedKeys.NewsTitlesNo]:    newsTitlesNoFeedReducer,
  [FeedKeys.NewsTitlesRu]:    newsTitlesRuFeedReducer,
  [FeedKeys.StoryTemplateEn]: storyTemplateEnFeedReducer,
  [FeedKeys.StoryTemplateNo]: storyTemplateNoFeedReducer,
  [FeedKeys.StoryTemplateRu]: storyTemplateRuFeedReducer,
});

export default feedsReducer;