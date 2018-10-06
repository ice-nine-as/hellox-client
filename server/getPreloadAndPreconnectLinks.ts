import {
  LocationState,
} from 'redux-first-router';
import {
  PageIdentifiers,
} from '../src/Enums/PageIdentifiers';

export function getPreloadAndPreconnectLinks(location: LocationState): Array<string> {
  const type = location.type as PageIdentifiers;
  const baseLinks = [
    '<link rel="preload" href="/static/vendor.js" as="script">',
    '<link rel="preload" href="/fonts/Lato-Regular.woff2" as="font" crossorigin="anonymous">',
    '<link rel="preconnect" href="https://s3.eu-central-1.amazonaws.com" crossorigin>',
    '<link rel="preconnect" href="https://www.google-analytics.com" crossorigin>',
    '<link rel="preconnect" href="https://www.googletagmanager.com" crossorigin>',
  ];

  if (type === PageIdentifiers.Home) {
    return [
      '<link rel="preconnect" href="https://cms.hellox.me" crossorigin>',
      '<link rel="preconnect" href="https://forum.hellox.me" crossorigin>',
    ].concat(baseLinks);
  } else if (type === PageIdentifiers.About) {
    return [
      '<link rel="preconnect" href="https://cms.hellox.me" crossorigin>',
    ].concat(baseLinks);
  } else if (type === PageIdentifiers.Archives) {
    return [
      '<link rel="preconnect" href="https://cms.hellox.me" crossorigin>',
    ].concat(baseLinks);
  } else if (type === PageIdentifiers.Article) {
    return [
      '<link rel="preconnect" href="https://cms.hellox.me" crossorigin>',
    ].concat(baseLinks);
  } else if (type === PageIdentifiers.Podcast) {
    return [
      '<link rel="preconnect" href="https://player.blubrry.com" crossorigin>',
    ].concat(baseLinks);
  } else if (type === PageIdentifiers.Podcasts) {
    return [
      '<link rel="preconnect" href="https://www.speakpipe.com" crossorigin>',
      '<link rel="preconnect" href="https://fonts.googleapis.com crossorigin>',
    ].concat(baseLinks);
  } else if (type === PageIdentifiers.Write) {
    return baseLinks;
  }

  return baseLinks;
}

export default getPreloadAndPreconnectLinks;