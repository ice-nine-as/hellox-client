import {
  getAppReducers,
} from '../../src/Functions/getAppReducers';
jest.mock('../../src/Functions/getAppReducers');

import {
  getReducers,
} from '../../src/Functions/getReducers';

type Mock = jest.Mock;

describe('getDefaultReducers unit tests.', () => {
  beforeEach(() => {
    (getAppReducers as Mock).mockClear();
  });

  it('Calls getAppReducers when producing the root reducer map.', () => {
    getReducers();
    expect((getAppReducers as Mock).mock.calls.length).toBe(1);
  });

  it('Spreads the product of getAppReducers into the return object.', () => {
    const appReducers = {
      one:   '1',
      two:   '2',
      three: '3',
    };

    (getAppReducers as Mock).mockImplementation(() => appReducers);

    /* Change to toContainsEqual after second reducer is added. */
    expect(getAppReducers()).toEqual(appReducers);
  });
});