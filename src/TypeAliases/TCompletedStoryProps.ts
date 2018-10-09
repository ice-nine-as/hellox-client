import {
  IStoryGeneratorAction,
} from '../Actions/App/IStoryGeneratorAction';
import {
  IStoryTemplate,
} from '../Interfaces/IStoryTemplate';
import {
  Languages,
} from '../Enums/Languages';
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
  language:      Languages,
  storyTemplate: IStoryTemplate,
  setCurrentPart(value: StoryGeneratorParts, templateKey: StoryGeneratorTemplateKeys): IStoryGeneratorAction,
  setStoryState(value: StoryStates): IStoryGeneratorAction,
};

export default TCompletedStoryProps;