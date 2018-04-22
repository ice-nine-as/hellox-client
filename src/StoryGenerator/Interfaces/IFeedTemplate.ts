import {
  IFeedTemplateQuestion,
} from './IFeedTemplateQuestion';

export interface IFeedTemplate {
  field_field_story_template_body: [
    {
      raw: {
        safe_value: string,
      },
    }
  ];

  field_field_question: Array<IFeedTemplateQuestion>,
  node_title: string,
}

export default IFeedTemplate;