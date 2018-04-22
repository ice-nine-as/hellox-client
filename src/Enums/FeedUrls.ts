export enum FeedUrls {
  NewsFull             = 'https://cms.hellox.me/feeds/news-feed-full.xml',

  /* These are *not* usable as URLs without replacing the node segment: :id. */
  NewsSingleArticle    = 'https://cms.hellox.me/feeds/:id/news-feed-full-single.xml',
  /* */

  NewsTeasers          = 'https://cms.hellox.me/feeds/news-feed-teaser.xml',
  NewsTitles           = 'https://cms.hellox.me/feeds/news-feed-title.xml',  

  /* Mirrored on the CMS in order to get around CORS problems with
   * in-browser fetch. */
  Podcast              = 'https://cms.hellox.me/feeds/podcast-feed.xml',

  /* Provides the source for the rotating quotes on the home page. */
  Quotes               = 'https://cms.hellox.me/feeds/quotes-feed.xml',

  StoryTemplateEnPartA = 'https://cms.hellox.me/feeds/en/A/story-template-feed.xml',
  StoryTemplateEnPartB = 'https://cms.hellox.me/feeds/en/B/story-template-feed.xml',
  StoryTemplateEnPartC = 'https://cms.hellox.me/feeds/en/C/story-template-feed.xml',
  StoryTemplateNoPartA = 'https://cms.hellox.me/feeds/nb/A/story-template-feed.xml',
  StoryTemplateNoPartB = 'https://cms.hellox.me/feeds/nb/B/story-template-feed.xml',
  StoryTemplateNoPartC = 'https://cms.hellox.me/feeds/nb/C/story-template-feed.xml',
  StoryTemplateRuPartA = 'https://cms.hellox.me/feeds/ru/A/story-template-feed.xml',
  StoryTemplateRuPartB = 'https://cms.hellox.me/feeds/ru/B/story-template-feed.xml',
  StoryTemplateRuPartC = 'https://cms.hellox.me/feeds/ru/C/story-template-feed.xml',

  TeamMembers          = 'https://cms.hellox.me/feeds/team-members-feed.xml',
}

export default FeedUrls;