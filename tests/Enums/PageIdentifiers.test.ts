import {
  defaultPageIdentifier,
  PageIdentifiers,
} from '../../src/Enums/PageIdentifiers';

describe('PageIdentifiers unit tests.', () => {
  it('Is an object.', () => {
    expect(typeof PageIdentifiers === 'object' && Boolean(PageIdentifiers))
      .toBe(true);
  });

  it('Has only string keys.', () => {
    const keys = Object.keys(PageIdentifiers);
    expect(keys.filter((aa) => typeof aa === 'string').length)
      .toBe(keys.length);
  });

  it('Has no empty string keys.', () => {
    const keys = Object.keys(PageIdentifiers);
    expect(keys.filter((aa) => aa !== '').length).toBe(keys.length);
  });

  it('Has only string values.', () => {
    const values = Object.keys(PageIdentifiers).map((aa) => PageIdentifiers[aa]);
    expect(values.filter((aa) => typeof aa === 'string').length)
      .toBe(values.length);
  });

  it('Has a defaultPageIdentifier value of Home.', () => {
    expect(defaultPageIdentifier).toBe(PageIdentifiers.Home);
  });
});