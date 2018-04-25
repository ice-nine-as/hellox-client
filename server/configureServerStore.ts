import {
  configureClientStore,
} from '../src/Modules/configureClientStore';
import {
  createRssThunk,
} from '../src/Actions/Creators/createRssThunk';
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
  history = null)
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

  const controller = new AbortController();
  const { signal, } = controller;

  /* Only allow 250ms for the fetch to complete. This allows us to mediate
   * between AWS interior network performance (way faster than user requests)
   * and time to first byte (critical, gets ruined if a fetch takes too
   * long). */
  const fetchTTL = 250;
  const timeoutId = setTimeout(() => {
    try {
      controller.abort();
    } catch (e) {
      console.error(e);
    }
  }, fetchTTL);

  if (type === PageIdentifiers.Archives) {
    /* Pre-load news feed for Archives page. */
    try {
      await store.dispatch(createRssThunk({
        feedKey: FeedKeys.NewsFull,
        signal,
      }));
    } catch (e) {
      if (e.name !== 'AbortError') {
        console.error('Error encountered fetching articles.');
        console.error(e);
      }
    }
  }  else if (type === PageIdentifiers.Home) {
    try {
      await Promise.all([
        store.dispatch(createRssThunk({
          feedKey: FeedKeys.NewsTeasers,
          signal,
        })),
      ]);
    } catch (e) {
      if (e.name !== 'AbortError') {
        console.error('Error fetching article teasers.');
        console.error(e);
      }
    }
  } else if (type === PageIdentifiers.Write) {
    /* Pre-load same-language story generator templates. */
    try {
      if (language === Languages.Norwegian) {
        await Promise.all([
          store.dispatch(createRssThunk({
            feedKey: FeedKeys.StoryTemplateNoPartA,
            signal,
          })),

          store.dispatch(createRssThunk({
            feedKey: FeedKeys.StoryTemplateNoPartB,
            signal,
          })),
          
          store.dispatch(createRssThunk({
            feedKey: FeedKeys.StoryTemplateNoPartC,
            signal,
          })),
        ]);
      } else if (language === Languages.Russian) {
        await Promise.all([
          store.dispatch(createRssThunk({
            feedKey: FeedKeys.StoryTemplateRuPartA,
            signal,
          })),

          store.dispatch(createRssThunk({
            feedKey: FeedKeys.StoryTemplateRuPartB,
            signal,
          })),
          
          store.dispatch(createRssThunk({
            feedKey: FeedKeys.StoryTemplateRuPartC,
            signal,
          })),
        ]);
      } else {
        await Promise.all([
          store.dispatch(createRssThunk({
            feedKey: FeedKeys.StoryTemplateEnPartA,
            signal,
          })),

          store.dispatch(createRssThunk({
            feedKey: FeedKeys.StoryTemplateEnPartB,
            signal,
          })),
          
          store.dispatch(createRssThunk({
            feedKey: FeedKeys.StoryTemplateEnPartC,
            signal,
          })),
        ]);
      }
    } catch (e) {
      if (e.name !== 'AbortError') {
        console.error('Error encountered fetching story templates.');
        console.error(e);
      }
    }
  }

  clearTimeout(timeoutId);

  const status = location.type === NOT_FOUND ? 404 : 200;
  res.status(status);

  return store;
}

export default configureServerStore;