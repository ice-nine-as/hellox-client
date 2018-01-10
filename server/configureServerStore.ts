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
  createMemoryHistory,
} from 'history';
import {
  NOT_FOUND,
} from 'redux-first-router';
import {
  TAppProps,
} from '../src/TypeAliases/TAppProps';

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
  } = configureClientStore(_history, {} as TAppProps, routesMap);

  await thunk(store);

  const { location, location: { pathname, }, } = store.getState();

  if (location.kind === 'redirect') {
    res.redirect(302, pathname);
    return null;
  }

  const status = location.type === NOT_FOUND ? 404 : 200
  res.status(status);

  return store;
}

export default configureServerStore;