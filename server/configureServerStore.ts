import {
  configureClientStore,
} from '../src/Modules/configureClientStore';
import {
  Request,
  Response,
} from 'express';
import {
  FeedKeys,
} from '../src/Enums/FeedKeys';
import {
  getRoutesMap,
} from '../src/Modules/getRoutesMap';
import {
  createRssThunk,
} from '../src/Actions/Creators/createRssThunk';
import {
  createMemoryHistory,
} from 'history';
import {
  isLanguage,
} from '../src/TypeGuards/isLanguage';
import {
  Languages,
} from '../src/Enums/Languages';
import {
  PageIdentifiers,
} from '../src/Enums/PageIdentifiers';
import {
  NOT_FOUND,
} from 'redux-first-router';
import {
  TStoreProps,
} from '../src/TypeAliases/TStoreProps';

const Negotiator = require('negotiator');

export async function configureServerStore(
  req: Request,
  res: Response,
  routesMap = getRoutesMap(),
  history   = null)
{
  const _history = history || createMemoryHistory({
    initialEntries: [ req.path, ],
  });

  const language = (() => {
    const negotiator = new Negotiator(req);
    const acceptedLanguages = (Object as any).values(Languages)
      /* TODO: add Russian language after text is ready. */
      .filter((lang: Languages) => lang !== Languages.Russian);
    const lang = negotiator.language(acceptedLanguages);
    return isLanguage(lang) ? lang : Languages.English;
  })();

  const preloadedState: Partial<TStoreProps> = {
    language,
  };

  const {
    store,
    thunk,
  } = configureClientStore(_history, preloadedState, routesMap);

  /* Execute routes thunk. */
  await thunk(store);

  const {
    location,
    location: {
      pathname,
      type,
    },
  } = store.getState();

  if (location.kind === 'redirect') {
    res.redirect(302, pathname);
    return null;
  }

  if (type === PageIdentifiers.Archives) {
    /* Pre-load news feed for Archives page. */
    try {
      await store.dispatch(createRssThunk({ feedKey: FeedKeys.NewsFull, }));
    } catch (e) {
      console.error('Error encountered fetching articles.');
      console.error(e);
    }
  } else if (type === PageIdentifiers.Podcasts) {
    /* Pre-load news feed for Archives page. */
    try {
      await store.dispatch(createRssThunk({ feedKey: FeedKeys.Podcast, }));
    } catch (e) {
      console.error('Error encountered fetching podcasts.');
      console.error(e);
    }
  } else if (type === PageIdentifiers.Home) {
    try {
      await Promise.all([
        store.dispatch(createRssThunk({
          feedKey: FeedKeys.Podcast,
        })),

        store.dispatch(createRssThunk({
          feedKey: FeedKeys.NewsTeasers,
        })),
      ]);
    } catch (e) {
      console.error('Error fetching ');
      console.error(e);
    }
  } else if (type === PageIdentifiers.Write) {
    try {
      /* Pre-load same-language story generator templates. */
      if (language === Languages.Norwegian) {
        await Promise.all([
          store.dispatch(createRssThunk({
            feedKey: FeedKeys.StoryTemplateNoPartA,
          })),

          store.dispatch(createRssThunk({
            feedKey: FeedKeys.StoryTemplateNoPartB,
          })),
          
          store.dispatch(createRssThunk({
            feedKey: FeedKeys.StoryTemplateNoPartC,
          })),
        ]);
      } else if (language === Languages.Russian) {
        await Promise.all([
          store.dispatch(createRssThunk({
            feedKey: FeedKeys.StoryTemplateRuPartA,
          })),

          store.dispatch(createRssThunk({
            feedKey: FeedKeys.StoryTemplateRuPartB,
          })),
          
          store.dispatch(createRssThunk({
            feedKey: FeedKeys.StoryTemplateRuPartC,
          })),
        ]);
      } else {
        await Promise.all([
          store.dispatch(createRssThunk({
            feedKey: FeedKeys.StoryTemplateEnPartA,
          })),

          store.dispatch(createRssThunk({
            feedKey: FeedKeys.StoryTemplateEnPartB,
          })),
          
          store.dispatch(createRssThunk({
            feedKey: FeedKeys.StoryTemplateEnPartC,
          })),
        ]);
      }
    } catch (e) {
      console.error('Error encountered fetching story templates.');
      console.error(e);
    }
  }

  const status = location.type === NOT_FOUND ? 404 : 200;
  res.status(status);

  return store;
}

export default configureServerStore;