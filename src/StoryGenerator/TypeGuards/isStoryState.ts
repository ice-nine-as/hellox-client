import {
  StoryStates,
} from '../Enums/StoryStates';

export const isStoryState = (maybe: any): maybe is StoryStates => {
  return (Object as any).values(StoryStates).includes(maybe);
};

export default isStoryState;