import {
  IStoryGeneratorAction,
} from '../Actions/IStoryGeneratorAction';
import {
  IAnswerModel,
} from './IAnswerModel';
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

export interface IAnswerProps extends IAnswerModel {
  language:    Languages,
  part:        StoryGeneratorParts,
  storyState:  StoryStates,
  templateKey: StoryGeneratorTemplateKeys,
  setAnswerText(value: string, templateKey: StoryGeneratorTemplateKeys, id: string): IStoryGeneratorAction;
}

export default IAnswerProps;