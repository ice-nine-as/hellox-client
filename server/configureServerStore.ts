import {
  configureClientStore,
} from '../src/Functions/configureClientStore';
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
} from '../src/Functions/getRoutesMap';
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

  /* Only allow 500ms for the fetch to complete. This allows us a middle ground
   * between AWS interior network performance (way faster than user requests)
   * and time to first byte (critical, gets ruined if a fetch takes too
   * long). */
  const fetchTTL = 500;
  const timeoutId = setTimeout(() => {
    try {
      controller.abort();
    } catch (e) {
      console.error('Aborting fetch failed.');
      console.error(e);
    }
  }, fetchTTL);

  /* Try to prefetch resources within the AWS edge (forum and CMS). */
  let rssFetchFailed = false;
  if (type === PageIdentifiers.Home) {
    try {
      await Promise.all([
        // @ts-ignore
        store.dispatch(createRssThunk({
          feedKey: FeedKeys.NewsTeasers,
          signal,
        })),

        // @ts-ignore
        store.dispatch(createRssThunk({
          feedKey: FeedKeys.Podcast,
          signal,
        })),

        // @ts-ignore
        store.dispatch(createRssThunk({
          feedKey: FeedKeys.ForumTopics,
          signal,
        })),
      ]);
    } catch (e) {
      rssFetchFailed = true;
      if (e.name !== 'AbortError') {
        console.error('Error fetching one of the feeds for the home page.');
        console.error(e);
      }
    }
  } else if (type === PageIdentifiers.About) {
    /* Pre-load team members feed for About page. */
    try {
      // @ts-ignore
      await store.dispatch(createRssThunk({
        feedKey: FeedKeys.TeamMembers,
        signal,
      }));
    } catch (e) {
      rssFetchFailed = true;
      if (e.name !== 'AbortError') {
        console.error('Error encountered fetching team members feed.');
        console.error(e);
      }
    }
  } else if (type === PageIdentifiers.Archives) {
    /* Pre-load news feed for Archives page. */
    try {
      // @ts-ignore
      await store.dispatch(createRssThunk({
        feedKey: FeedKeys.NewsFull,
        signal,
      }));
    } catch (e) {
      rssFetchFailed = true;
      if (e.name !== 'AbortError') {
        console.error('Error encountered fetching articles.');
        console.error(e);
      }
    }
  } else if (type === PageIdentifiers.Article) {
    /* Pre-loads a single news article feeds for the relevant Article page. */
    if (location.payload && (location.payload as any).id) {
      const id = (location.payload as any).id;
      /* Only load if there's a valid id. */
      try {
        // @ts-ignore
        await store.dispatch(createRssThunk({
          feedKey: FeedKeys.NewsFull,
          id,
          signal,
        }));
      } catch (e) {
        rssFetchFailed = true;
        if (e.name !== 'AbortError') {
          console.error(`Error encountered fetching article ${id}.`);
          console.error(e);
        }
      }
    }
  } else if (type === PageIdentifiers.Write) {
    /* Pre-load same-language story generator templates. */
    try {
      if (language === Languages.Norwegian) {
        await Promise.all([
          /* The Redux types get mad about the fact that we're dispatching a
           * thunk, not a normal action, and I'm not exactly sure right now
           * what would have to be done to make Redux happy, so I've just
           * ignored all of the createRssThunk dispatches. All of these calls
           * work correctly in practice, they just fail typing checks. */ 
          // @ts-ignore
          store.dispatch(createRssThunk({
            feedKey: FeedKeys.StoryTemplateNoPartA,
            signal,
          })),

          // @ts-ignore
          store.dispatch(createRssThunk({
            feedKey: FeedKeys.StoryTemplateNoPartB,
            signal,
          })),
          
          // @ts-ignore
          store.dispatch(createRssThunk({
            feedKey: FeedKeys.StoryTemplateNoPartC,
            signal,
          })),
        ]);
      } else if (language === Languages.Russian) {
        await Promise.all([
          // @ts-ignore
          store.dispatch(createRssThunk({
            feedKey: FeedKeys.StoryTemplateRuPartA,
            signal,
          })),

          // @ts-ignore
          store.dispatch(createRssThunk({
            feedKey: FeedKeys.StoryTemplateRuPartB,
            signal,
          })),
          
          // @ts-ignore
          store.dispatch(createRssThunk({
            feedKey: FeedKeys.StoryTemplateRuPartC,
            signal,
          })),
        ]);
      } else {
        await Promise.all([
          // @ts-ignore
          store.dispatch(createRssThunk({
            feedKey: FeedKeys.StoryTemplateEnPartA,
            signal,
          })),

          // @ts-ignore
          store.dispatch(createRssThunk({
            feedKey: FeedKeys.StoryTemplateEnPartB,
            signal,
          })),
          
          // @ts-ignore
          store.dispatch(createRssThunk({
            feedKey: FeedKeys.StoryTemplateEnPartC,
            signal,
          })),
        ]);
      }
    } catch (e) {
      rssFetchFailed = true;
      if (e.name !== 'AbortError') {
        console.error('Error encountered fetching story templates.');
        console.error(e);
      }
    }
  }

  clearTimeout(timeoutId);

  const status = location.type === NOT_FOUND ? 404 : 200;
  res.status(status);

  return {
    rssFetchFailed,
    store,
  };
}

export default configureServerStore;