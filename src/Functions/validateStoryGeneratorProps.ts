import {
  isStoryTemplate,
} from '../TypeGuards/isStoryTemplate';
import {
  StoryStates,
} from '../Enums/StoryStates';

export const strings = {
  PROPS_INVALID:
    'The props argument passed to validateStoryGeneratorProps was not an ' +
    'object.',

  MAX_ANSWER_LENGTH_INVALID:
    'The maxAnswerLength property passed to validateStoryGeneratorProps was ' +
    'not an integer greater than 0.',

  PROSE_TEMPLATE_INVALID:
    'The proseTemplate property passed to validateStoryGeneratorProps did ' +
    'not meet the isProseTemplate type guard.',

  QUESTIONS_INVALID:
    'The questions property passed to validateStoryGeneratorProps was not ' +
    'an array.',

  QUESTIONS_EMPTY:
    'The questions property passed to validateStoryGeneratorProps was empty.',

  SHUFFLE_INVALID:
    'The shuffle property passed to validateStoryGeneratorProps was not a ' +
    'boolean.',

  STATE_INVALID:
    'The state property passed to validateStoryGeneratorProps was not a ' +
    'member of the StoryStates enum.',
};

export const validateStoryGeneratorProps = (props: any) => {
  if (typeof props !== 'object' || !props) {
    throw new Error(strings.PROPS_INVALID);
  } else if (typeof props.maxAnswerLength !== 'number' ||
    (<any>Number).isNaN(props.maxAnswerLength) ||
    !(<any>Number).isSafeInteger(props.maxAnswerLength) ||
    props.maxAnswerLength <= 0)
  {
    throw new Error(strings.MAX_ANSWER_LENGTH_INVALID);
  } else if (!isStoryTemplate(props.proseTemplate)) {
    throw new Error(strings.PROSE_TEMPLATE_INVALID);
  } else if (!Array.isArray(props.questions)) {
    throw new Error(strings.QUESTIONS_INVALID);
  } else if (props.questions.length === 0) {
    throw new Error(strings.QUESTIONS_EMPTY);
  } else if (!(<any>Object).values(StoryStates).includes(props.state)) {
    throw new Error(strings.STATE_INVALID);
  }

  return true;
};