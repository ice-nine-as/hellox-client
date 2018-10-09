import {
  IFeedTemplate,
} from '../Interfaces/IFeedTemplate';
import {
  isFeedTemplateQuestion,
} from './isFeedTemplateQuestion';

export const isFeedTemplate = (maybe: any): maybe is IFeedTemplate => {
  return Boolean(maybe &&
    typeof maybe === 'object' &&
    
    Array.isArray(maybe.field_field_story_template_body) &&

    maybe.field_field_story_template_body[0] &&
    typeof maybe.field_field_story_template_body[0] === 'object' &&
    
    maybe.field_field_story_template_body[0].raw &&
    typeof maybe.field_field_story_template_body[0].raw === 'object' &&

    maybe.field_field_story_template_body[0].raw.safe_value &&
    typeof maybe.field_field_story_template_body[0].raw.safe_value === 'string' &&

    Array.isArray(maybe.field_field_question) &&
    !maybe.field_field_question.find((question: any) => !isFeedTemplateQuestion(question)) &&

    maybe.node_title &&
    typeof maybe.node_title === 'string');
};

export default isFeedTemplate;