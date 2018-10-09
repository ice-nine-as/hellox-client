import {
  IStoryTemplate,
} from '../Interfaces/IStoryTemplate';
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
  StoryGeneratorTemplateKeys,
} from '../Enums/StoryGeneratorTemplateKeys';

export const storyTemplateReducer: Reducer<IStoryTemplate> =
  function (
    previousState: IStoryTemplate | null = null,
    action: IStoryGeneratorAction | AnyAction)
{
  // @ts-ignore
  const __this: { key: StoryGeneratorTemplateKeys, } = this;

  if (isStoryGeneratorAction(action) && action.templateKey === __this.key) {
    if (action.type === StoryGeneratorActionTypes.StoryTemplate) {
      return action.value;
    } else if (previousState &&
               action.id &&
               action.type === StoryGeneratorActionTypes.AnswerText)
    {
      const newState = Object.assign({}, previousState);

      const question = newState.questions.find((question) => {
        return question.answer.id === action.id;
      });

      if (question) {
        question.answer.text = action.value;
        return newState;
      }
    }
  }

  return previousState;
};

export default storyTemplateReducer;