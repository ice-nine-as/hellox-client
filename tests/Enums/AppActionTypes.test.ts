import {
  AppActionTypes,
} from '../../src/Enums/AppActionTypes';

describe('AppActionTypes unit tests.', () => {
  it('Is an object.', () => {
    expect(typeof AppActionTypes === 'object' && Boolean(AppActionTypes))
      .toBe(true);
  });

  it('Has only string keys.', () => {
    const keys = Object.keys(AppActionTypes);
    expect(keys.filter((aa) => typeof aa === 'string').length)
      .toBe(keys.length);
  });

  it('Has no empty string keys.', () => {
    const keys = Object.keys(AppActionTypes);
    expect(keys.filter((aa) => aa !== '').length).toBe(keys.length);
  });

  it('Has only string values.', () => {
    const values = Object.keys(AppActionTypes).map((aa: any) => (
      AppActionTypes[aa]
    ));

    expect(values.filter((aa) => typeof aa === 'string').length)
      .toBe(values.length);
  });

  it('Has only all-caps values.', () => {
    const values = Object.keys(AppActionTypes).map((aa: any) => (
      AppActionTypes[aa]
    ));
    
    expect(values.filter((aa) => aa.toUpperCase() === aa).length)
      .toBe(values.length);
  });
});