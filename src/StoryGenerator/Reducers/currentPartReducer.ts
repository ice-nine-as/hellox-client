import {
  isStoryGeneratorAction,
} from '../TypeGuards/isStoryGeneratorAction';
import {
  isStoryGeneratorPart,
} from '../TypeGuards/isStoryGeneratorPart';
import {
  IStoryGeneratorAction,
} from '../Actions/IStoryGeneratorAction';
import {
  AnyAction,
  Reducer,
} from 'redux';
import {
  StoryGeneratorActionTypes,
} from '../Enums/StoryGeneratorActionTypes';
import {
  StoryGeneratorParts,
} from '../Enums/StoryGeneratorParts';

export const currentPartReducer: Reducer<StoryGeneratorParts | null> = (
  previousState: StoryGeneratorParts | null = StoryGeneratorParts.A,
  action: IStoryGeneratorAction | AnyAction,
): StoryGeneratorParts | null =>
{
  if (isStoryGeneratorAction(action) &&
    action.type === StoryGeneratorActionTypes.CurrentPart &&
    (action.value === null || isStoryGeneratorPart(action.value)))
  {
    return action.value;
  }

  return previousState;
};

export default currentPartReducer;