import {
  IFeedTemplate,
} from '../Interfaces/IFeedTemplate';
import {
  IQuestionModel,
} from '../Interfaces/IQuestionModel';

export const strings = {
  ATTR_INVALID:
    'The attr argument was not questions, storyText, or title.',
};

export const getAttrFromFeedTemplate = (
  attr: 'questions' | 'storyText' | 'title',
  template: IFeedTemplate) =>
{
  if (attr === 'questions') {
    return template.field_field_question.map<IQuestionModel>((feedQuestion) => {
      const selectOptions = (feedQuestion.raw.field_select_options.und[0] || { safe_value: '', }).safe_value.split(/,\s*/);
      return {
        answer: {
          id: feedQuestion.raw.field_answer_id.und[0].safe_value,
          selectOptions,
          text: '',
          type: feedQuestion.raw.field_answer_type.und[0].value,
        },

        text: feedQuestion.raw.field_question_text.und[0].safe_value,
        type: feedQuestion.raw.field_answer_type.und[0].value,
      };
    });
  } else if (attr === 'storyText') {
    return template.field_field_story_template_body[0].raw.safe_value;
  } else if (attr === 'title') {
    return template.node_title;
  } else {
    throw new Error(strings.ATTR_INVALID);
  }
};

export default getAttrFromFeedTemplate;