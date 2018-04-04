import {
  IStoryGeneratorAction,
} from '../Actions/IStoryGeneratorAction';
import {
  StoryGeneratorParts,
} from '../Enums/StoryGeneratorParts';
import {
  StoryGeneratorTemplateKeys,
} from '../Enums/StoryGeneratorTemplateKeys';
import {
  StoryStates,
} from '../Enums/StoryStates';

export type TStoryGeneratorDispatchProps = {
  setAnswerText(value: string, templateKey: StoryGeneratorTemplateKeys, id: string): IStoryGeneratorAction;
  setCurrentPart(value: StoryGeneratorParts): IStoryGeneratorAction;
  setStoryState(value: StoryStates): IStoryGeneratorAction;
}

export default TStoryGeneratorDispatchProps;