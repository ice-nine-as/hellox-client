import {
  IFeedTemplate,
} from '../Interfaces/IFeedTemplate';
import {
  IRssAction,
} from '../Actions/App/IRssAction';
import {
  StoryGeneratorTemplateKeys,
} from '../Enums/StoryGeneratorTemplateKeys';
import {
  TFeedsMap,
} from './TFeedsMap';

export type TWriteDispatchProps = {
  getStoryTemplate(feedKey: keyof TFeedsMap): Promise<IRssAction>;
  setStoryTemplate(key: StoryGeneratorTemplateKeys, value: IFeedTemplate): Promise<IRssAction>;
};

export default TWriteDispatchProps;