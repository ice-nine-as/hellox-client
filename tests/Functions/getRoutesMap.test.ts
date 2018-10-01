import {
  getRoutesMap,
} from '../../src/Functions/getRoutesMap';
import {
  PageIdentifiers,
} from '../../src/Enums/PageIdentifiers';
import {
  RouteIdentifiers,
} from '../../src/Enums/RouteIdentifiers';
import {
  TRouteProps,
} from '../../src/TypeAliases/TRouteProps';

describe('getRoutesMap unit tests.', () => {
  it('Returns a RoutesMap with PageIdentifiers keys as keys.', () => {
    expect(Object.keys(getRoutesMap()))
      .toEqual(Object.keys(PageIdentifiers));
  });

  it('Returns a RoutesMap with RouteIdentifiers values as path properties.', () => {
    const routesMap = getRoutesMap();
    const routesMapValues = Object.keys(routesMap).map((route) => {
      /* No string routes are used. */
      return (routesMap[route] as TRouteProps).path;
    });

    const routeIdentifierValues = Object.keys(RouteIdentifiers).map((route: any) => {
      return RouteIdentifiers[route];
    });

    expect(routesMapValues).toEqual(routeIdentifierValues);
  });
});