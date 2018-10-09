import {
  IQuestionModel,
} from './IQuestionModel';

export interface IStoryTemplate {
  questions: ReadonlyArray<IQuestionModel>;
  storyText: string;
  title:     string;
}

export default IStoryTemplate;