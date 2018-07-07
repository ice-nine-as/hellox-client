import {
  doneReducer,
} from '../../src/Reducers/doneReducer';
import {
  errorReducer,
} from '../../src/Reducers/errorReducer';
import {
  getAppReducers,
} from '../../src/Functions/getAppReducers';
import {
  loadingReducer,
} from '../../src/Reducers/loadingReducer';
import { hamburgerOpenReducer } from '../../src/Reducers/hamburgerOpenReducer';
import { languageReducer } from '../../src/Reducers/languageReducer';
import { feedsReducer } from '../../src/Reducers/feedsReducer';

describe('getAppReducers unit tests', () => {
  it('Returns a done property with the value of the doneReducer function.', () => {
    expect(getAppReducers().done).toBe(doneReducer);
  });

  it('Disallows changing the done property.', () => {
    const reducers = getAppReducers();
    const func = () => (<any>reducers).done = 'foo';
    expect(func).toThrow();
  });

  it('Returns an error property with the value of the errorReducer function.', () => {
    expect(getAppReducers().error).toBe(errorReducer);
  });

  it('Disallows changing the error property.', () => {
    const reducers = getAppReducers();
    const func = () => (<any>reducers).error = 'foo';
    expect(func).toThrow();
  });

  it('Returns a hamburgerOpen property with the value of the hamburgerOpenReducer function.', () => {
    expect(getAppReducers().hamburgerOpen).toBe(hamburgerOpenReducer);
  });

  it('Disallows changing the hamburgerOpen property.', () => {
    const reducers = getAppReducers();
    const func = () => (<any>reducers).hamburgerOpen = 'foo';
    expect(func).toThrow();
  });

  it('Returns a language property with the value of the languageReducer function.', () => {
    expect(getAppReducers().language).toBe(languageReducer);
  });

  it('Disallows changing the language property.', () => {
    const reducers = getAppReducers();
    const func = () => (<any>reducers).language = 'foo';
    expect(func).toThrow();
  });

  it('Returns a loading property with the value of the loadingReducer function.', () => {
    expect(getAppReducers().loading).toBe(loadingReducer);
  });

  it('Disallows changing the loading property.', () => {
    const reducers = getAppReducers();
    const func = () => (<any>reducers).loading = 'foo';
    expect(func).toThrow();
  });

  it('Returns a feeds property with the value of the feedsReducer function.', () => {
    expect(getAppReducers().feeds).toBe(feedsReducer);
  });

  it('Disallows changing the feeds property.', () => {
    const reducers = getAppReducers();
    const func = () => (<any>reducers).feeds = 'foo';
    expect(func).toThrow();
  });
});