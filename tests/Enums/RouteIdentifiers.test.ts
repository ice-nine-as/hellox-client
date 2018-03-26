import {
  PageIdentifiers,
} from '../../src/Enums/PageIdentifiers';
import {
  RouteIdentifiers,
} from '../../src/Enums/RouteIdentifiers';

describe('PageIdentifiers unit tests.', () => {
  it('Is an object.', () => {
    expect(typeof RouteIdentifiers === 'object' && Boolean(RouteIdentifiers))
      .toBe(true);
  });

  it('Has only string keys.', () => {
    const keys = Object.keys(RouteIdentifiers);
    expect(keys.filter((aa) => typeof aa === 'string').length)
      .toBe(keys.length);
  });

  it('Has no empty string keys.', () => {
    const keys = Object.keys(RouteIdentifiers);
    expect(keys.filter((aa) => aa !== '').length).toBe(keys.length);
  });

  it('Has only string values.', () => {
    const values = Object.keys(RouteIdentifiers).map((aa) => {
      return RouteIdentifiers[aa];
    });

    expect(values.filter((aa) => typeof aa === 'string').length)
      .toBe(values.length);
  });

  it('Has only routes that begin with /.', () => {
    const values = Object.keys(RouteIdentifiers).map((aa) => {
      return RouteIdentifiers[aa];
    });

    expect(values.filter((aa) => aa[0] === '/').length)
      .toBe(values.length);
  });

  it('Has only routes that end with /.', () => {
    const values = Object.keys(RouteIdentifiers).map((aa) => {
      return RouteIdentifiers[aa];
    });

    expect(values.filter((aa) => aa[aa.length - 1] === '/').length)
      .toBe(values.length);
  });

  it('Has identical keys to PageIdentifiers.', () => {
    const titleKeys = Object.keys(RouteIdentifiers);
    const idKeys = Object.keys(PageIdentifiers);
    expect(titleKeys.filter((aa) => idKeys.indexOf(aa) !== -1).length)
      .toBe(idKeys.length);
  });
});