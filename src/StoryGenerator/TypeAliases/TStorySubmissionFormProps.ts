import {
  IStoryTemplate,
} from '../Interfaces/IStoryTemplate';
import {
  Languages,
} from '../../Enums/Languages';

export type TStorySubmissionFormProps = {
  completedStory: string,
  language:       Languages,
  storyTemplate:  IStoryTemplate,
};

export default TStorySubmissionFormProps;