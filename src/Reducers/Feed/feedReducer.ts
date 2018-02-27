import {
  newsFullEnFeedReducer,
} from './newsFullEnFeedReducer';
import {
  newsTitlesEnFeedReducer,
} from './newsTitlesEnFeedReducer';
import {
  newsFullNoFeedReducer,
} from './newsFullNoFeedReducer';
import {
  newsTitlesNoFeedReducer,
} from './newsTitlesNoFeedReducer';
import {
  newsFullRuFeedReducer,
} from './newsFullRuFeedReducer';
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
  newsFullEnFeed:      newsFullEnFeedReducer,
  newsTitlesEnFeed:    newsTitlesEnFeedReducer,
  newsFullNoFeed:      newsFullNoFeedReducer,
  newsTitlesNoFeed:    newsTitlesNoFeedReducer,
  newsFullRuFeed:      newsFullRuFeedReducer,
  newsTitlesRuFeed:    newsTitlesRuFeedReducer,
  storyTemplateEnFeed: storyTemplateEnFeedReducer,
  storyTemplateNoFeed: storyTemplateNoFeedReducer,
  storyTemplateRuFeed: storyTemplateRuFeedReducer,
});

export default feedsReducer;