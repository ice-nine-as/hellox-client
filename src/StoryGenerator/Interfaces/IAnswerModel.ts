import {
  AnswerTypes,
} from '../Enums/AnswerTypes';

export interface IAnswerModel {
  id:            string;
  selectOptions: Array<string>;
  text:          string;
  type:          AnswerTypes;
}

export default IAnswerModel;