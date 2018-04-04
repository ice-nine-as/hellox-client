import {
  IQuestionModel,
} from './IQuestionModel';
import {
  IStoryGeneratorAction,
} from '../Actions/IStoryGeneratorAction';
import {
  Languages,
} from '../../Enums/Languages';
import {
  StoryGeneratorParts,
} from '../Enums/StoryGeneratorParts';
import {
  StoryGeneratorTemplateKeys,
} from '../Enums/StoryGeneratorTemplateKeys';
import {
  StoryStates,
} from '../Enums/StoryStates';

export interface IQuestionProps extends IQuestionModel {
  currentPart: StoryGeneratorParts,
  language:    Languages,
  storyState:  StoryStates,
  templateKey: StoryGeneratorTemplateKeys,
  setAnswerText(value: string, templateKey: StoryGeneratorTemplateKeys, id: string): IStoryGeneratorAction,
}

export default IQuestionProps;