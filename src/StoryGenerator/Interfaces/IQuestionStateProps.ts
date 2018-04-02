import {
  Languages,
} from '../../Enums/Languages';
import {
  StoryGeneratorParts,
} from '../Enums/StoryGeneratorParts';

export interface IQuestionStateProps {
  currentPart: StoryGeneratorParts,
  language:    Languages,
}

export default IQuestionStateProps;