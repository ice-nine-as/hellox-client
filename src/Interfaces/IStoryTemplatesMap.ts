import {
  IStoryTemplate,
} from './IStoryTemplate';
import {
  StoryGeneratorTemplateKeys,
} from '../Enums/StoryGeneratorTemplateKeys';

export interface IStoryTemplatesMap {
  [StoryGeneratorTemplateKeys.EnPartA]: IStoryTemplate,
  [StoryGeneratorTemplateKeys.NoPartA]: IStoryTemplate,
  [StoryGeneratorTemplateKeys.RuPartA]: IStoryTemplate,
  [StoryGeneratorTemplateKeys.EnPartB]: IStoryTemplate,
  [StoryGeneratorTemplateKeys.NoPartB]: IStoryTemplate,
  [StoryGeneratorTemplateKeys.RuPartB]: IStoryTemplate,
  [StoryGeneratorTemplateKeys.EnPartC]: IStoryTemplate,
  [StoryGeneratorTemplateKeys.NoPartC]: IStoryTemplate,
  [StoryGeneratorTemplateKeys.RuPartC]: IStoryTemplate,
}

export default IStoryTemplatesMap;