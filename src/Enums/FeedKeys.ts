export enum FeedKeys {
  NewsFullEn          = 'NewsFullEn',
  NewsFullNo          = 'NewsFullNo',
  NewsFullRu          = 'NewsFullRu',
  /* These do *not* appear in the redux store, and are instead are fetched each
   * time a user visits an individual article. This is done to avoid crosstalk. */
  NewsSingleArticleEn = 'https://cms.hellox.me/feeds/en/:id/news-feed-full-single.xml',
  NewsSingleArticleNo = 'https://cms.hellox.me/feeds/nb/:id/news-feed-full-single.xml',
  NewsSingleArticleRu = 'https://cms.hellox.me/feeds/ru/:id/news-feed-full-single.xml',
  /* */
  NewsTeasersEn       = 'NewsTeasersEn',
  NewsTeasersNo       = 'NewsTeasersNo',
  NewsTeasersRu       = 'NewsTeasersRu',
  NewsTitlesEn        = 'NewsTitlesEn',  
  NewsTitlesNo        = 'NewsTitlesNo',  
  NewsTitlesRu        = 'NewsTitlesRu',
  StoryTemplateEn     = 'StoryTemplateEn',
  StoryTemplateNo     = 'StoryTemplateNo',
  StoryTemplateRu     = 'StoryTemplateRu',
}

export default FeedKeys;