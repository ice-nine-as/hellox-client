import {
  getDefaultRoutesMap,
} from '../../src/Modules/getDefaultRoutesMap';
import {
  PageIdentifiers,
} from '../../src/Enums/PageIdentifiers';
import {
  RouteIdentifiers,
} from '../../src/Enums/RouteIdentifiers';
import {
  TRouteProps,
} from '../../src/TypeAliases/TRouteProps';

describe('getDefaultRoutesMap unit tests.', () => {
  it('Returns a RoutesMap with PageIdentifiers keys as keys.', () => {
    expect(Object.keys(getDefaultRoutesMap()))
      .toEqual(Object.keys(PageIdentifiers));
  });

  it('Returns a RoutesMap with RouteIdentifiers values as path properties.', () => {
    const routesMap = getDefaultRoutesMap();
    const routesMapValues = Object.keys(routesMap).map((route) => {
      /* No string routes are used. */
      return (routesMap[route] as TRouteProps).path;
    });

    const routeIdentifierValues = Object.keys(RouteIdentifiers).map((route) => {
      return RouteIdentifiers[route];
    });

    expect(routesMapValues).toEqual(routeIdentifierValues);
  });

  /* Not using thunks currently.
  it('Includes a thunk in each route object.', () => {
    const routesMap = getDefaultRoutesMap();
    const routesMapThunkCount = Object.keys(routesMap).map((route) => {
      return Number(typeof routesMap[route].thunk === 'function');
    }).reduce((aa, bb) => {
      return aa + bb;
    });

    expect(Object.keys(routesMap).length).toBe(routesMapThunkCount)
  });*/
});