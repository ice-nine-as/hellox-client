import {
  FeedKeys,
} from '../Enums/FeedKeys';
import {
  feedReducer,
} from './feedReducer';
import {
  IRssAction,
} from '../Actions/App/IRssAction';
import {
  combineReducers,
} from 'redux';
import {
  TReducer,
} from '../TypeAliases/TReducer';
import {
  TFeedsMap,
} from '../TypeAliases/TFeedsMap';

export const getKeyObj = (key: keyof TFeedsMap) => ({ key, });

export const feedsReducer: TReducer<TFeedsMap, IRssAction> = combineReducers({
  [FeedKeys.NewsFullEn]:           feedReducer.bind(getKeyObj(FeedKeys.NewsFullEn)),
  [FeedKeys.NewsFullNo]:           feedReducer.bind(getKeyObj(FeedKeys.NewsFullNo)),
  [FeedKeys.NewsFullRu]:           feedReducer.bind(getKeyObj(FeedKeys.NewsFullRu)),
  [FeedKeys.NewsTeasersEn]:        feedReducer.bind(getKeyObj(FeedKeys.NewsTeasersEn)),
  [FeedKeys.NewsTeasersNo]:        feedReducer.bind(getKeyObj(FeedKeys.NewsTeasersNo)),
  [FeedKeys.NewsTeasersRu]:        feedReducer.bind(getKeyObj(FeedKeys.NewsTeasersRu)),
  [FeedKeys.NewsTitlesEn]:         feedReducer.bind(getKeyObj(FeedKeys.NewsTitlesEn)),
  [FeedKeys.NewsTitlesNo]:         feedReducer.bind(getKeyObj(FeedKeys.NewsTitlesNo)),
  [FeedKeys.NewsTitlesRu]:         feedReducer.bind(getKeyObj(FeedKeys.NewsTitlesRu)),
  [FeedKeys.StoryTemplateEnPartA]: feedReducer.bind(getKeyObj(FeedKeys.StoryTemplateEnPartA)),
  [FeedKeys.StoryTemplateEnPartB]: feedReducer.bind(getKeyObj(FeedKeys.StoryTemplateEnPartB)),
  [FeedKeys.StoryTemplateEnPartC]: feedReducer.bind(getKeyObj(FeedKeys.StoryTemplateEnPartC)),
  [FeedKeys.StoryTemplateNoPartA]: feedReducer.bind(getKeyObj(FeedKeys.StoryTemplateNoPartA)),
  [FeedKeys.StoryTemplateNoPartB]: feedReducer.bind(getKeyObj(FeedKeys.StoryTemplateNoPartB)),
  [FeedKeys.StoryTemplateNoPartC]: feedReducer.bind(getKeyObj(FeedKeys.StoryTemplateNoPartC)),
  [FeedKeys.StoryTemplateRuPartA]: feedReducer.bind(getKeyObj(FeedKeys.StoryTemplateRuPartA)),
  [FeedKeys.StoryTemplateRuPartB]: feedReducer.bind(getKeyObj(FeedKeys.StoryTemplateRuPartB)),
  [FeedKeys.StoryTemplateRuPartC]: feedReducer.bind(getKeyObj(FeedKeys.StoryTemplateRuPartC)),
});

export default feedsReducer;