import {
  isLanguage,
} from '../TypeGuards/isLanguage';
import {
  isStoryGeneratorPart,
} from '../TypeGuards/isStoryGeneratorPart';
import {
  IStoryTemplate,
} from '../Interfaces/IStoryTemplate';
import {
  IStoryTemplatesMap,
} from '../Interfaces/IStoryTemplatesMap';
import {
  Languages,
} from '../Enums/Languages';
import {
  StoryGeneratorParts,
} from '../Enums/StoryGeneratorParts';
import {
  StoryGeneratorTemplateKeys,
} from '../Enums/StoryGeneratorTemplateKeys';

export const strings = {
  CURRENT_PART_INVALID:
    'The currentPart argument prop did not meet the isStoryGeneratorPart ' +
    'type guard.',

  LANGUAGE_INVALID:
    'The language argument prop did not meet the isLanguage type guard.',

  STORY_TEMPLATES_INVALID:
    'The storyTemplates argument prop was not an object.',
};

export const getStoryTemplate = ({
  currentPart,
  language,
  storyTemplates,
}: {
  currentPart:    StoryGeneratorParts,
  language:       Languages,
  storyTemplates: IStoryTemplatesMap,
}): {
  key:      StoryGeneratorTemplateKeys | null,
  template: IStoryTemplate | null,
} =>
{
  if (!isStoryGeneratorPart(currentPart)) {
    throw new Error(strings.CURRENT_PART_INVALID);
  } else if (!isLanguage(language)) {
    throw new Error(strings.LANGUAGE_INVALID);
  } else if (storyTemplates !== null && typeof storyTemplates !== 'object') {
    throw new Error(strings.STORY_TEMPLATES_INVALID);
  }

  const isA = currentPart === StoryGeneratorParts.A;
  const isB = currentPart === StoryGeneratorParts.B;
  const isC = currentPart === StoryGeneratorParts.C;

  if (!isA && !isB && !isC) {
    /* Do not return any results if there is no current part set. */
    return {
      key: null,
      template: null,
    };
  }

  let key = null;

  if (language === Languages.Norwegian) {
    if (isA) {
      key = StoryGeneratorTemplateKeys.NoPartA;
    } else if (isB) {
      key = StoryGeneratorTemplateKeys.NoPartB;
    } else {
      key = StoryGeneratorTemplateKeys.NoPartC;
    }
  } else if (language === Languages.Russian) {
    if (isA) {
      key = StoryGeneratorTemplateKeys.RuPartA;
    } else if (isB) {
      key = StoryGeneratorTemplateKeys.RuPartB;
    } else {
      key = StoryGeneratorTemplateKeys.RuPartC;
    }
  } else {
    if (isA) {
      key = StoryGeneratorTemplateKeys.EnPartA;
    } else if (isB) {
      key = StoryGeneratorTemplateKeys.EnPartB;
    } else {
      key = StoryGeneratorTemplateKeys.EnPartC;
    }
  }

  return {
    key,
    template: (storyTemplates || {})[key] || null,
  };
};