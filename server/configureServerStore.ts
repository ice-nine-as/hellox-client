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
/*import {
  getStoryTemplate,
} from '../src/Modules/getStoryTemplate';*/
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
    const acceptedLanguages = (Object as any).values(Languages);
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

  if (type === PageIdentifiers.Archives) {
    /* Pre-load same-language news feed for Archives page. */
    if (language === Languages.Norwegian) {
      await store.dispatch(createRssThunk({ feedKey: FeedKeys.NewsFullNo, }));
    } else if (language === Languages.Russian) {
      await store.dispatch(createRssThunk({ feedKey: FeedKeys.NewsFullRu, }));
    } else {
      await store.dispatch(createRssThunk({ feedKey: FeedKeys.NewsFullEn, }));
    }
  } else if (type === PageIdentifiers.Write) {
    /* Pre-load same-language story generator prompt. */
    /*if (language === Languages.Norwegian) {
      await store.dispatch(createRssThunk(FeedKeys.StoryTemplateNo));
    } else if (language === Languages.Russian) {
      await store.dispatch(createRssThunk(FeedKeys.StoryTemplateRu));
    } else {
      await store.dispatch(createRssThunk(FeedKeys.StoryTemplateEn));
    }*/
  }

  if (location.kind === 'redirect') {
    res.redirect(302, pathname);
    return null;
  }

  const status = location.type === NOT_FOUND ? 404 : 200;
  res.status(status);

  return store;
}

export default configureServerStore;