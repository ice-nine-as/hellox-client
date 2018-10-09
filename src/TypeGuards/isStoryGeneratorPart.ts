import {
  StoryGeneratorParts,
} from '../Enums/StoryGeneratorParts';

export const isStoryGeneratorPart = (maybe: any): maybe is StoryGeneratorParts => {
  return maybe === null || (Object as any).values(StoryGeneratorParts).indexOf(maybe) !== -1;
};

export default isStoryGeneratorPart;