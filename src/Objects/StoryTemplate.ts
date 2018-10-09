import {
  IQuestionModel,
} from '../Interfaces/IQuestionModel';
import {
  IStoryCompletion,
} from '../Interfaces/IStoryCompletion';
import {
  IStoryTemplate,
} from '../Interfaces/IStoryTemplate';

export const strings = {
  STORY_TEMPLATE_SOURCE_INVALID:
    'The storyTemplateSrc argument passed to the StoryTemplate constructor ' +
    'did not meet the isStoryTemplate type guard.',

  TEXT_INVALID:
    'The text argument passed to the StoryTemplate constructor was not a ' +
    'string with content.',
};

const escape = require('escape-string-regexp');

export class StoryTemplate implements IStoryTemplate, IStoryCompletion {
  questions: ReadonlyArray<IQuestionModel> = Object.freeze([]);
  storyText: string = '';
  title:     string = '';

  constructor(storyTemplateSrc?: IStoryTemplate) {
    if (!storyTemplateSrc) {
      return;
    }

    this.questions = storyTemplateSrc.questions;
    this.storyText = storyTemplateSrc.storyText;
    this.title     = storyTemplateSrc.title;
  }

  getCompleteStory(): string {
    if (typeof this.storyText !== 'string' || this.storyText.length === 0) {
      throw new Error(strings.TEXT_INVALID);
    }

    let completed = this.storyText;

    this.questions.forEach((question) => {
      const id = question.answer.id;
      const re = new RegExp(escape(`{{${id}}}`), 'g');
      completed = completed.replace(re, question.answer.text || question.answer.default);
    });

    return completed;
  }
}

export default StoryTemplate;