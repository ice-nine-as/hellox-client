import {
  IStoryTemplate,
} from '../Interfaces/IStoryTemplate';

export const isStoryTemplate = (maybe: any): maybe is IStoryTemplate => {
  return typeof maybe === 'object' &&
    maybe &&
    typeof maybe.text === 'string' &&
    maybe.text &&
    typeof maybe.complete === 'function';
};

export default isStoryTemplate;