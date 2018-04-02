import {
  isStoryGeneratorActionType,
} from './isStoryGeneratorActionType';
import {
  IStoryGeneratorAction,
} from '../Actions/IStoryGeneratorAction';

export const isStoryGeneratorAction = (maybe: any): maybe is IStoryGeneratorAction => {
  return typeof maybe === 'object' &&
    maybe &&
    isStoryGeneratorActionType(maybe.type) &&
    'value' in maybe;
};

export default isStoryGeneratorAction;