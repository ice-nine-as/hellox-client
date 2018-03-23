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

export function getRoutesMap(): RoutesMap<TRouteProps> {
  const ids:    Array<string> = (Object as any).values(PageIdentifiers);
  const routes: Array<string> = (Object as any).values(RouteIdentifiers);
  return ids.reduce<RoutesMap<TRouteProps>>((routesMap, id, index) => {
    routesMap[id] = {
      path: routes[index],
      /* thunk: async () => {}, */
    };

    return routesMap;
  }, {});
}

export default getRoutesMap;