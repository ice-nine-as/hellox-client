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
  [FeedKeys.NewsFull]:             feedReducer.bind(getKeyObj(FeedKeys.NewsFull)),
  [FeedKeys.NewsTeasers]:          feedReducer.bind(getKeyObj(FeedKeys.NewsTeasers)),
  [FeedKeys.NewsTitles]:           feedReducer.bind(getKeyObj(FeedKeys.NewsTitles)),

  [FeedKeys.Podcast]:              feedReducer.bind(getKeyObj(FeedKeys.Podcast)),
  
  [FeedKeys.Quotes]:               feedReducer.bind(getKeyObj(FeedKeys.Quotes)),

  [FeedKeys.StoryTemplateEnPartA]: feedReducer.bind(getKeyObj(FeedKeys.StoryTemplateEnPartA)),
  [FeedKeys.StoryTemplateEnPartB]: feedReducer.bind(getKeyObj(FeedKeys.StoryTemplateEnPartB)),
  [FeedKeys.StoryTemplateEnPartC]: feedReducer.bind(getKeyObj(FeedKeys.StoryTemplateEnPartC)),
  [FeedKeys.StoryTemplateNoPartA]: feedReducer.bind(getKeyObj(FeedKeys.StoryTemplateNoPartA)),
  [FeedKeys.StoryTemplateNoPartB]: feedReducer.bind(getKeyObj(FeedKeys.StoryTemplateNoPartB)),
  [FeedKeys.StoryTemplateNoPartC]: feedReducer.bind(getKeyObj(FeedKeys.StoryTemplateNoPartC)),
  [FeedKeys.StoryTemplateRuPartA]: feedReducer.bind(getKeyObj(FeedKeys.StoryTemplateRuPartA)),
  [FeedKeys.StoryTemplateRuPartB]: feedReducer.bind(getKeyObj(FeedKeys.StoryTemplateRuPartB)),
  [FeedKeys.StoryTemplateRuPartC]: feedReducer.bind(getKeyObj(FeedKeys.StoryTemplateRuPartC)),

  [FeedKeys.TeamMembers]:          feedReducer.bind(getKeyObj(FeedKeys.TeamMembers)),
});

export default feedsReducer;