import {
  IAnswerModel,
} from './IAnswerModel';

export interface IQuestionModel {
  answer: IAnswerModel;
  text:   string;
}

export default IQuestionModel;