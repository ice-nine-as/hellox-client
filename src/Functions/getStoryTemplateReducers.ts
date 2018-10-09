import {
  storyTemplateReducer,
} from '../Reducers/storyTemplateReducer';
import {
  combineReducers,
} from 'redux';
import {
  StoryGeneratorTemplateKeys,
} from '../Enums/StoryGeneratorTemplateKeys';

export const getKeyObj = (key: StoryGeneratorTemplateKeys) => ({ key, });

export const getStoryTemplateReducers = () => {
  return combineReducers({
    [StoryGeneratorTemplateKeys.EnPartA]: storyTemplateReducer.bind(getKeyObj(StoryGeneratorTemplateKeys.EnPartA)),
    [StoryGeneratorTemplateKeys.EnPartB]: storyTemplateReducer.bind(getKeyObj(StoryGeneratorTemplateKeys.EnPartB)),
    [StoryGeneratorTemplateKeys.EnPartC]: storyTemplateReducer.bind(getKeyObj(StoryGeneratorTemplateKeys.EnPartC)),
    [StoryGeneratorTemplateKeys.NoPartA]: storyTemplateReducer.bind(getKeyObj(StoryGeneratorTemplateKeys.NoPartA)),
    [StoryGeneratorTemplateKeys.NoPartB]: storyTemplateReducer.bind(getKeyObj(StoryGeneratorTemplateKeys.NoPartB)),
    [StoryGeneratorTemplateKeys.NoPartC]: storyTemplateReducer.bind(getKeyObj(StoryGeneratorTemplateKeys.NoPartC)),
    [StoryGeneratorTemplateKeys.RuPartA]: storyTemplateReducer.bind(getKeyObj(StoryGeneratorTemplateKeys.RuPartA)),
    [StoryGeneratorTemplateKeys.RuPartB]: storyTemplateReducer.bind(getKeyObj(StoryGeneratorTemplateKeys.RuPartB)),
    [StoryGeneratorTemplateKeys.RuPartC]: storyTemplateReducer.bind(getKeyObj(StoryGeneratorTemplateKeys.RuPartC)),
  });
};