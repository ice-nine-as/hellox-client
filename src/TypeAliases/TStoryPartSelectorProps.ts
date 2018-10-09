import {
  IStoryGeneratorAction,
} from '../Actions/App/IStoryGeneratorAction';
import {
  StoryGeneratorParts,
} from '../Enums/StoryGeneratorParts';

export type TStoryPartSelectorProps = {
  currentPart: StoryGeneratorParts,
  titleMap: { A: string, B: string, C: string, },
  setCurrentPart(value: StoryGeneratorParts): IStoryGeneratorAction,
};

export default TStoryPartSelectorProps;