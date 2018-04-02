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

export interface IQuestionProps extends IQuestionModel {
  currentPart: StoryGeneratorParts,
  language:    Languages,
  templateKey: StoryGeneratorTemplateKeys,
  setAnswerText(value: string, templateKey: StoryGeneratorTemplateKeys, id: string): IStoryGeneratorAction,
}

export default IQuestionProps;