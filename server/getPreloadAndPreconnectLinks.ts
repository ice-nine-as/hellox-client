import {
  LocationState,
} from 'redux-first-router';
import {
  PageIdentifiers,
} from '../src/Enums/PageIdentifiers';

export function getPreloadAndPreconnectLinks(location: LocationState, rssFetchFailed: boolean): string {
  const type = location.type as PageIdentifiers;
  const baseLinks =
    `<link rel="preconnect" href="https://www.google-analytics.com" crossorigin>
     <link rel="preconnect" href="https://www.googletagmanager.com" crossorigin>`;

  if (type === PageIdentifiers.Home) {
    return `<link rel="preconnect" href="https://forum.hellox.me" crossorigin>
            <link rel="preconnect" href="https://cms.hellox.me" crossorigin>
            <link rel="preconnect" href="https://s3.eu-central-1.amazonaws.com" crossorigin>\n` +
            baseLinks;
  } else if (type === PageIdentifiers.About) {
    return `<link rel="preconnect" href="https://s3.eu-central-1.amazonaws.com" crossorigin>
            <link rel="preconnect" href="https://cms.hellox.me" crossorigin>` +
            baseLinks;
  } else if (type === PageIdentifiers.Archives) {
    return rssFetchFailed ?
            `<link rel="preload" href="https://cms.hellox.me/feeds/news-feed-teaser.xml" as="fetch" crossorigin>\n` :
            '' +

            `<link rel="preload" href="https://cms.hellox.me/feeds/podcast-feed.xml" as="fetch" crossorigin>
             <link rel="preconnect" href="https://cms.hellox.me" crossorigin>\n` +
            baseLinks;
  } else if (type === PageIdentifiers.Article) {
    if (rssFetchFailed && location.payload && (location.payload as any).id) {
      const id = (location.payload as any).id;
      return `<link rel="preconnect" href="https://cms.hellox.me" crossorigin>
              <link rel="preload" href="https://cms.hellox.me/feeds/${id}/news-feed-full-single.xml" as="fetch" crossorigin>\n` +
              baseLinks;
    } else {
      return `<link rel="preconnect" href="https://cms.hellox.me" crossorigin>\n` +
              baseLinks;
    }
  } else if (type === PageIdentifiers.Podcast) {
    return `<link rel="preconnect" href="https://s3.eu-central-1.amazonaws.com" crossorigin>
            <link rel="preconnect" href="https://player.blubrry.com" crossorigin>\n` +
            baseLinks;
  } else if (type === PageIdentifiers.Podcasts) {
    return `<link rel="preconnect" href="https://s3.eu-central-1.amazonaws.com" crossorigin>
            <link rel="preconnect" href="https://www.speakpipe.com" crossorigin>
            <link rel="preconnect" href="https://fonts.googleapis.com crossorigin>\n` +
            baseLinks;
  } else if (type === PageIdentifiers.Write) {
    return rssFetchFailed ?
            `<link rel="preload" href="https://cms.hellox.me/feeds/story-template-feed.xml" as="fetch" crossorigin>\n` :
            '' +

            `<link rel="preconnect" href="https://s3.eu-central-1.amazonaws.com" crossorigin>\n` +
            baseLinks;
  }

  return baseLinks;
}

export default getPreloadAndPreconnectLinks;