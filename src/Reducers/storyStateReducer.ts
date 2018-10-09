import {
  isStoryGeneratorAction,
} from '../TypeGuards/isStoryGeneratorAction';
import {
  IStoryGeneratorAction,
} from '../Actions/App/IStoryGeneratorAction';
import {
  AnyAction,
  Reducer,
} from 'redux';
import {
  StoryGeneratorActionTypes,
} from '../Enums/StoryGeneratorActionTypes';
import {
  StoryStates,
} from '../Enums/StoryStates';

export const storyStateReducer: Reducer<StoryStates> =
  (previousState: StoryStates = StoryStates.InProgress,
    action: IStoryGeneratorAction | AnyAction) =>
{
  if (isStoryGeneratorAction(action) &&
    action.type === StoryGeneratorActionTypes.State)
  {
    return action.value;
  }

  return previousState;
};

export default storyStateReducer;