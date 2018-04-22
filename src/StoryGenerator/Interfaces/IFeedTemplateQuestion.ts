import {
  AnswerTypes,
} from '../Enums/AnswerTypes';

type TDrupalUnd = [
  {
    safe_value: string,
  }
];

export interface IFeedTemplateQuestion {
  raw: {
    field_answer_id: {
      und: TDrupalUnd,
    },

    field_answer_type: {
      und: [
        {
          value: AnswerTypes,
        }
      ],
    },

    field_default_answer: {
      und: TDrupalUnd,
    },

    field_question_text: {
      und: TDrupalUnd,
    },

    field_select_options: {
      und: Array<{ safe_value: string, }>;
    },
  },
}

export default IFeedTemplateQuestion;