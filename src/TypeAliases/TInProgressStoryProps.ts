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

export type TInProgressStoryProps = {
  currentPart:   StoryGeneratorParts,
  language:      Languages,
  storyTemplate: IStoryTemplate | null,
  storyState:    StoryStates,
  templateKey:   StoryGeneratorTemplateKeys,
  setAnswerText(value: string, templateKey: StoryGeneratorTemplateKeys, id: string): IStoryGeneratorAction,
  setStoryState(value: StoryStates): IStoryGeneratorAction,
};

export default TInProgressStoryProps;