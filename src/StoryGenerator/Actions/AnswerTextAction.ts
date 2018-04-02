import {
  IStoryGeneratorAction,
} from './IStoryGeneratorAction';
import {
  StoryGeneratorActionTypes,
} from '../Enums/StoryGeneratorActionTypes';

export const AnswerTextAction: IStoryGeneratorAction = Object.freeze({
  type:  StoryGeneratorActionTypes.AnswerText,
  value: '',
});

export default AnswerTextAction;