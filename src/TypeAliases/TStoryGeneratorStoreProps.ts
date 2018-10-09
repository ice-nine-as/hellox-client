import {
  Languages,
} from '../Enums/Languages';
import {
  StoryGeneratorParts,
} from '../Enums/StoryGeneratorParts';
import {
  StoryStates,
} from '../Enums/StoryStates';
import {
  IStoryTemplatesMap,
} from '../Interfaces/IStoryTemplatesMap';

export type TStoryGeneratorStoreProps = {
  currentPart:    StoryGeneratorParts;
  language:       Languages;
  storyTemplates: IStoryTemplatesMap;
  storyState:     StoryStates;
}

export default TStoryGeneratorStoreProps;