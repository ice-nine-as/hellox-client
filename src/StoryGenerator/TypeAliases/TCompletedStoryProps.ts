import {
  IStoryGeneratorAction,
} from '../Actions/IStoryGeneratorAction';
import {
  IStoryTemplate,
} from '../Interfaces/IStoryTemplate';
import {
  StoryGeneratorParts,
} from '../Enums/StoryGeneratorParts';
import {
  StoryGeneratorTemplateKeys,
} from '../Enums/StoryGeneratorTemplateKeys';
import {
  StoryStates,
} from '../Enums/StoryStates';

export type TCompletedStoryProps = {
  storyTemplate: IStoryTemplate | null;
  setCurrentPart(value: StoryGeneratorParts, templateKey: StoryGeneratorTemplateKeys): IStoryGeneratorAction;
  setStoryState(value: StoryStates): IStoryGeneratorAction;
};

export default TCompletedStoryProps;