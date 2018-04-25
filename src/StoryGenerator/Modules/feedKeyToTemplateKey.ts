import {
  FeedKeys,
} from '../../Enums/FeedKeys';
import {
  StoryGeneratorTemplateKeys,
} from '../Enums/StoryGeneratorTemplateKeys';
import {
  TFeedsMap,
} from '../../TypeAliases/TFeedsMap';

export const strings = {
  FEED_KEY_INVALID:
    'The feedKey argument was not one of the story template keys.',
};

export const feedKeyToTemplateKey = (feedKey: keyof TFeedsMap): StoryGeneratorTemplateKeys => {
  if (feedKey === FeedKeys.StoryTemplateEnPartA) {
    return StoryGeneratorTemplateKeys.EnPartA;
  } else if (feedKey === FeedKeys.StoryTemplateEnPartB) {
    return StoryGeneratorTemplateKeys.EnPartB;
  } else if (feedKey === FeedKeys.StoryTemplateEnPartC) {
    return StoryGeneratorTemplateKeys.EnPartC;
  } else if (feedKey === FeedKeys.StoryTemplateNoPartA) {
    return StoryGeneratorTemplateKeys.NoPartA;
  } else if (feedKey === FeedKeys.StoryTemplateNoPartB) {
    return StoryGeneratorTemplateKeys.NoPartB;
  } else if (feedKey === FeedKeys.StoryTemplateNoPartC) {
    return StoryGeneratorTemplateKeys.NoPartC;
  } else if (feedKey === FeedKeys.StoryTemplateRuPartA) {
    return StoryGeneratorTemplateKeys.RuPartA;
  } else if (feedKey === FeedKeys.StoryTemplateRuPartB) {
    return StoryGeneratorTemplateKeys.RuPartB;
  } else if (feedKey === FeedKeys.StoryTemplateRuPartC) {
    return StoryGeneratorTemplateKeys.RuPartC;
  } else {
    throw new Error(strings.FEED_KEY_INVALID);
  }
};

export default feedKeyToTemplateKey;