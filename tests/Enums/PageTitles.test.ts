import {
  PageIdentifiers,
} from '../../src/Enums/PageIdentifiers';
import {
  PageTitles,
} from '../../src/Enums/PageTitles';

describe('PageTitles unit tests.', () => {
  it('Is an object.', () => {
    expect(typeof PageTitles === 'object' && Boolean(PageTitles)).toBe(true);
  });

  it('Has only string keys.', () => {
    const keys = Object.keys(PageTitles);
    expect(keys.filter((aa) => typeof aa === 'string').length)
      .toBe(keys.length);
  });

  it('Has no empty string keys.', () => {
    const keys = Object.keys(PageTitles);
    expect(keys.filter((aa) => aa !== '').length).toBe(keys.length);
  });

  it('Has only string values.', () => {
    const values = Object.keys(PageTitles).map((aa: any) => (
      PageTitles[aa]
    ));

    expect(values.filter((aa) => typeof aa === 'string').length)
      .toBe(values.length);
  });

  it('Has the same number of key-value pairs as exist in PageIdentifiers.', () => {
    expect(Object.keys(PageTitles).length)
      .toBe(Object.keys(PageIdentifiers).length);
  });

  it('Has identical keys to PageIdentifiers.', () => {
    const titleKeys = Object.keys(PageTitles);
    const idKeys = Object.keys(PageIdentifiers);
    expect(titleKeys.filter((aa) => idKeys.indexOf(aa) !== -1).length)
      .toBe(idKeys.length);
  });
});