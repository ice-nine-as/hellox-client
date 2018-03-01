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

export function getDefaultRoutesMap(): RoutesMap<TRouteProps> {
  const ids    = Object.values(PageIdentifiers);
  const routes = Object.values(RouteIdentifiers);
  return ids.reduce<RoutesMap<TRouteProps>>((routesMap, id, index) => {
    routesMap[id] = {
      path: routes[index],
      /* thunk: async () => {}, */
    };

    return routesMap;
  }, {});
}

export default getDefaultRoutesMap;