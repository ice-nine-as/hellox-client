export enum FeedUrls {
  NewsFullEn          = 'https://cms.hellox.me/feeds/en/news-feed-full.xml',
  NewsFullNo          = 'https://cms.hellox.me/feeds/nb/news-feed-full.xml',
  NewsFullRu          = 'https://cms.hellox.me/feeds/ru/news-feed-full-ru.xml',
  /* These are *not* usable as URLs without replacing the node segment: :id. */
  NewsSingleArticleEn = 'https://cms.hellox.me/feeds/en/:id/news-feed-full-single.xml',
  NewsSingleArticleNo = 'https://cms.hellox.me/feeds/nb/:id/news-feed-full-single.xml',
  NewsSingleArticleRu = 'https://cms.hellox.me/feeds/ru/:id/news-feed-full-single.xml',
  /* */
  NewsTeasersEn       = 'https://cms.hellox.me/feeds/en/news-feed-teaser.xml',
  NewsTeasersNo       = 'https://cms.hellox.me/feeds/nb/news-feed-teaser.xml',
  NewsTeasersRu       = 'https://cms.hellox.me/feeds/ru/news-feed-teaser.xml',
  NewsTitlesEn        = 'https://cms.hellox.me/feeds/en/news-feed-title.xml',  
  NewsTitlesNo        = 'https://cms.hellox.me/feeds/nb/news-feed-title.xml',  
  NewsTitlesRu        = 'https://cms.hellox.me/feeds/ru/news-feed-title-ru.xml',
  StoryTemplateEn     = 'https://cms.hellox.me/feeds/en/story-template-feed.xml',
  StoryTemplateNo     = 'https://cms.hellox.me/feeds/nb/story-template-feed.xml',
  StoryTemplateRu     = 'https://cms.hellox.me/feeds/ru/story-template-feed.xml',
}

export default FeedUrls;