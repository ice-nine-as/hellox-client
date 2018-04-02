export enum FeedKeys {
  /* Stores whole articles. */
  NewsFullEn           = 'NewsFullEn',
  NewsFullNo           = 'NewsFullNo',
  NewsFullRu           = 'NewsFullRu',
  
  /* These do *not* appear in the redux store, and are instead are fetched each
   * time a user visits an individual article, and composed into the relevant
   * Full feed. This is done to avoid crosstalk. */
  NewsSingleArticleEn  = 'NewsSingleArticleEn',
  NewsSingleArticleNo  = 'NewsSingleArticleNo',
  NewsSingleArticleRu  = 'NewsSingleArticleRu',
  /* */

  /* Stores the hero image, authoring metadata, title, and header para. */
  NewsTeasersEn        = 'NewsTeasersEn',
  NewsTeasersNo        = 'NewsTeasersNo',
  NewsTeasersRu        = 'NewsTeasersRu',

  /* Stores only the titles of articles. Not used at present. */
  NewsTitlesEn         = 'NewsTitlesEn',  
  NewsTitlesNo         = 'NewsTitlesNo',
  NewsTitlesRu         = 'NewsTitlesRu',

  /* Story templates. Each episode of a story has three parts, A, B, and C. */
  StoryTemplateEnPartA = 'StoryTemplateEnPartA',
  StoryTemplateEnPartB = 'StoryTemplateEnPartB',
  StoryTemplateEnPartC = 'StoryTemplateEnPartC',
  StoryTemplateNoPartA = 'StoryTemplateNoPartA',
  StoryTemplateNoPartB = 'StoryTemplateNoPartB',
  StoryTemplateNoPartC = 'StoryTemplateNoPartC',
  StoryTemplateRuPartA = 'StoryTemplateRuPartA',
  StoryTemplateRuPartB = 'StoryTemplateRuPartB',
  StoryTemplateRuPartC = 'StoryTemplateRuPartC',
}

export default FeedKeys;