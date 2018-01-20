jest.mock('../../src/Reducers/appReducer');
import {
  appReducer,
} from '../../src/Reducers/appReducer';

import {
  getDefaultAppReducers,
} from '../../src/Modules/getDefaultAppReducers';

describe('getDefaultAppReducers unit tests', () => {
  it('Returns a done property with the value of the appReducer function.', () => {
    expect(getDefaultAppReducers().done).toBe(appReducer);
  });

  it('Disallows changing the done property.', () => {
    const reducers = getDefaultAppReducers();
    const func = () => (<any>reducers).done = 'foo';
    expect(func).toThrow();
  });

  it('Returns an error property with the value of the appReducer function.', () => {
    expect(getDefaultAppReducers().error).toBe(appReducer);
  });

  it('Disallows changing the error property.', () => {
    const reducers = getDefaultAppReducers();
    const func = () => (<any>reducers).error = 'foo';
    expect(func).toThrow();
  });

  it('Returns a loading property with the value of the appReducer function.', () => {
    expect(getDefaultAppReducers().loading).toBe(appReducer);
  });

  it('Disallows changing the loading property.', () => {
    const reducers = getDefaultAppReducers();
    const func = () => (<any>reducers).loading = 'foo';
    expect(func).toThrow();
  });
});