import {
  IFeedTemplateQuestion,
} from '../Interfaces/IFeedTemplateQuestion';
import {
  isAnswerType,
} from './isAnswerType';

export const isFeedTemplateQuestion = (maybe: any): maybe is IFeedTemplateQuestion => {
  return Boolean(maybe &&
    typeof maybe === 'object' &&

    maybe.raw &&
    typeof maybe.raw === 'object' &&

    maybe.raw.field_answer_id &&
    typeof maybe.raw.field_answer_id === 'object' &&

    Array.isArray(maybe.raw.field_answer_id.und) &&

    maybe.raw.field_answer_id.und[0] &&
    typeof maybe.raw.field_answer_id.und[0] === 'object' &&

    maybe.raw.field_answer_id.und[0].safe_value &&
    typeof maybe.raw.field_answer_id.und[0].safe_value === 'string' && 

    maybe.raw.field_question_text &&
    typeof maybe.raw.field_question_text === 'object' &&

    Array.isArray(maybe.raw.field_question_text.und) &&

    maybe.raw.field_question_text.und[0] &&
    typeof maybe.raw.field_question_text.und[0] === 'object' &&

    maybe.raw.field_question_text.und[0].safe_value &&
    typeof maybe.raw.field_question_text.und[0].safe_value === 'string' &&

    maybe.raw.field_select_options &&
    typeof maybe.raw.field_select_options === 'object' &&

    Array.isArray(maybe.raw.field_select_options.und) &&

    maybe.raw.field_answer_type &&
    typeof maybe.raw.field_answer_type === 'object' &&

    Array.isArray(maybe.raw.field_answer_type.und) &&

    maybe.raw.field_answer_type.und[0] &&
    typeof maybe.raw.field_answer_type.und[0] === 'object' &&

    isAnswerType(maybe.raw.field_answer_type.und[0].value));
};

export default isFeedTemplateQuestion;