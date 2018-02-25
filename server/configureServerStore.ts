import {
  configureClientStore,
} from '../src/Modules/configureClientStore';
import {
  Request,
  Response,
} from 'express';
import {
  getDefaultRoutesMap,
} from '../src/Modules/getDefaultRoutesMap';
import {
  getRssFeed,
} from '../src/Modules/getRssFeed';
import {
  //getStoryTemplate,
} from '../src/Modules/getStoryTemplate';
import {
  createMemoryHistory,
} from 'history';
import {
  NOT_FOUND,
} from 'redux-first-router';
import {
  TAppOwnProps,
} from '../src/TypeAliases/TAppOwnProps';

export async function configureServerStore(
  req: Request,
  res: Response,
  routesMap = getDefaultRoutesMap(),
  history  = null)
{
  const _history = history || createMemoryHistory({
    initialEntries: [ req.path, ],
  });

  const {
    store,
    thunk,
  } = configureClientStore(_history, {} as TAppOwnProps, routesMap);

  await thunk(store);

  await Promise.all([
    store.dispatch(getRssFeed()),
    //store.dispatch(getStoryTemplate()),
  ]);

  const {
    location,
    location: {
      pathname,
    },
  } = store.getState();

  if (location.kind === 'redirect') {
    res.redirect(302, pathname);
    return null;
  }

  const status = location.type === NOT_FOUND ? 404 : 200;
  res.status(status);

  return store;
}

export default configureServerStore;