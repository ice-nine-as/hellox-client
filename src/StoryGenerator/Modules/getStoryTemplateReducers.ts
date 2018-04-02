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
    [StoryGeneratorTemplateKeys.NoPartA]: storyTemplateReducer.bind(getKeyObj(StoryGeneratorTemplateKeys.NoPartB)),
    [StoryGeneratorTemplateKeys.RuPartA]: storyTemplateReducer.bind(getKeyObj(StoryGeneratorTemplateKeys.RuPartC)),
    [StoryGeneratorTemplateKeys.EnPartB]: storyTemplateReducer.bind(getKeyObj(StoryGeneratorTemplateKeys.EnPartA)),
    [StoryGeneratorTemplateKeys.NoPartB]: storyTemplateReducer.bind(getKeyObj(StoryGeneratorTemplateKeys.NoPartB)),
    [StoryGeneratorTemplateKeys.RuPartB]: storyTemplateReducer.bind(getKeyObj(StoryGeneratorTemplateKeys.RuPartC)),
    [StoryGeneratorTemplateKeys.EnPartC]: storyTemplateReducer.bind(getKeyObj(StoryGeneratorTemplateKeys.EnPartA)),
    [StoryGeneratorTemplateKeys.NoPartC]: storyTemplateReducer.bind(getKeyObj(StoryGeneratorTemplateKeys.NoPartB)),
    [StoryGeneratorTemplateKeys.RuPartC]: storyTemplateReducer.bind(getKeyObj(StoryGeneratorTemplateKeys.RuPartC)),
  });
};