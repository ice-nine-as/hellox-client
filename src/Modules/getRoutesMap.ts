import {
  PageIdentifiers,
} from '../Enums/PageIdentifiers';
import {
  RouteIdentifiers,
} from '../Enums/RouteIdentifiers';
import {
  RoutesMap,
} from 'redux-first-router';
import {
  TRouteProps,
} from '../TypeAliases/TRouteProps';

export const strings = {
  ENUMS_MISMATCH:
    'The PageIdentifiers and RouteIdentifiers enums were not of equal ' +
    'length, and the routes map cannot be constructed.',
};

export function getRoutesMap(): RoutesMap<TRouteProps> {
  const ids:    Array<string> = (Object as any).values(PageIdentifiers);
  const routes: Array<string> = (Object as any).values(RouteIdentifiers);
  if (ids.length !== routes.length) {
    throw new Error(strings.ENUMS_MISMATCH);
  }

  return ids.reduce<RoutesMap<TRouteProps>>((routesMap, id, index) => {
    routesMap[id] = {
      path: routes[index],
      /* thunk: async () => {}, */
    };

    return routesMap;
  }, {});
}

export default getRoutesMap;