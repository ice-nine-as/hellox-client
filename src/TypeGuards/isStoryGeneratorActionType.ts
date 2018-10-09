import {
  StoryGeneratorActionTypes
} from '../Enums/StoryGeneratorActionTypes';

export const isStoryGeneratorActionType = (maybe: any): maybe is StoryGeneratorActionTypes => {
  return (Object as any).values(StoryGeneratorActionTypes).indexOf(maybe) !== -1;
};

export default isStoryGeneratorActionType;