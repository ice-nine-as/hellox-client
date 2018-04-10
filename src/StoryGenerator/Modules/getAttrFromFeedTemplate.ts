import {
  AllHtmlEntities,
} from 'html-entities';
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
    const entities = new AllHtmlEntities();
    return template.field_field_question.map<IQuestionModel>((feedQuestion) => {
      const selectObj =
        feedQuestion.raw.field_select_options.und[0] ||
        { safe_value: '', };

      const selectRaw = selectObj.safe_value;
      const selectOptions = entities.decode(selectRaw).split(/,\s*/);
 
      return {
        answer: {
          id: feedQuestion.raw.field_answer_id.und[0].safe_value,
          selectOptions,
          /* If selectOptions has been set, default to the first option. */
          text: selectOptions.length ? selectOptions[0] : '',
          type: feedQuestion.raw.field_answer_type.und[0].value,
        },

        text: entities.decode(feedQuestion.raw.field_question_text.und[0].safe_value),
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