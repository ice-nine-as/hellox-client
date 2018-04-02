import {
  IStoryGeneratorAction,
} from './IStoryGeneratorAction';
import {
  StoryGeneratorActionTypes,
} from '../Enums/StoryGeneratorActionTypes';

export const CurrentPartAction: IStoryGeneratorAction = Object.freeze({
  type:  StoryGeneratorActionTypes.CurrentPart,
  value: null,
});

export default CurrentPartAction;