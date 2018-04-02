export enum FeedUrls {
  NewsFullEn           = 'https://cms.hellox.me/feeds/en/news-feed-full.xml',
  NewsFullNo           = 'https://cms.hellox.me/feeds/nb/news-feed-full.xml',
  NewsFullRu           = 'https://cms.hellox.me/feeds/ru/news-feed-full-ru.xml',

  /* These are *not* usable as URLs without replacing the node segment: :id. */
  NewsSingleArticleEn  = 'https://cms.hellox.me/feeds/en/:id/news-feed-full-single.xml',
  NewsSingleArticleNo  = 'https://cms.hellox.me/feeds/nb/:id/news-feed-full-single.xml',
  NewsSingleArticleRu  = 'https://cms.hellox.me/feeds/ru/:id/news-feed-full-single.xml',
  /* */
  NewsTeasersEn        = 'https://cms.hellox.me/feeds/en/news-feed-teaser.xml',
  NewsTeasersNo        = 'https://cms.hellox.me/feeds/nb/news-feed-teaser.xml',
  NewsTeasersRu        = 'https://cms.hellox.me/feeds/ru/news-feed-teaser.xml',
  NewsTitlesEn         = 'https://cms.hellox.me/feeds/en/news-feed-title.xml',  
  NewsTitlesNo         = 'https://cms.hellox.me/feeds/nb/news-feed-title.xml',  
  NewsTitlesRu         = 'https://cms.hellox.me/feeds/ru/news-feed-title.xml',
  
  StoryTemplateEnPartA = 'https://cms.hellox.me/feeds/en/A/story-template-feed.xml',
  StoryTemplateEnPartB = 'https://cms.hellox.me/feeds/en/B/story-template-feed.xml',
  StoryTemplateEnPartC = 'https://cms.hellox.me/feeds/en/C/story-template-feed.xml',
  StoryTemplateNoPartA = 'https://cms.hellox.me/feeds/nb/A/story-template-feed.xml',
  StoryTemplateNoPartB = 'https://cms.hellox.me/feeds/nb/B/story-template-feed.xml',
  StoryTemplateNoPartC = 'https://cms.hellox.me/feeds/nb/C/story-template-feed.xml',
  StoryTemplateRuPartA = 'https://cms.hellox.me/feeds/ru/A/story-template-feed.xml',
  StoryTemplateRuPartB = 'https://cms.hellox.me/feeds/ru/B/story-template-feed.xml',
  StoryTemplateRuPartC = 'https://cms.hellox.me/feeds/ru/C/story-template-feed.xml',
}

export default FeedUrls;