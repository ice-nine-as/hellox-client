import {
  AnswerTypes,
} from '../Enums/AnswerTypes';

export const isAnswerType = (maybe: any): maybe is AnswerTypes => {
  return (Object as any).values(AnswerTypes).indexOf(maybe) !== -1;
};

export default isAnswerType;