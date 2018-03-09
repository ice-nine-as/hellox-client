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
  newsFullEnFeed:      newsFullEnFeedReducer,
  newsTeasersEnFeed:   newsTeasersEnFeedReducer,
  newsTitlesEnFeed:    newsTitlesEnFeedReducer,
  newsFullNoFeed:      newsFullNoFeedReducer,
  newsTeasersNoFeed:   newsTeasersNoFeedReducer,
  newsTitlesNoFeed:    newsTitlesNoFeedReducer,
  newsFullRuFeed:      newsFullRuFeedReducer,
  newsTeasersRuFeed:   newsTeasersRuFeedReducer,
  newsTitlesRuFeed:    newsTitlesRuFeedReducer,
  storyTemplateEnFeed: storyTemplateEnFeedReducer,
  storyTemplateNoFeed: storyTemplateNoFeedReducer,
  storyTemplateRuFeed: storyTemplateRuFeedReducer,
});

export default feedsReducer;