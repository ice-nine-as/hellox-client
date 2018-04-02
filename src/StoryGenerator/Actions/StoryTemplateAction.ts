import {
  IStoryGeneratorAction,
} from './IStoryGeneratorAction';
import {
  StoryGeneratorActionTypes,
} from '../Enums/StoryGeneratorActionTypes';

export const StoryTemplateAction: IStoryGeneratorAction = Object.freeze({
  type:  StoryGeneratorActionTypes.StoryTemplate,
  value: null,
});

export default StoryTemplateAction;