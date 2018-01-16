jest.mock('../../src/Modules/getDefaultAppReducers');
import {
  getDefaultAppReducers,
} from '../../src/Modules/getDefaultAppReducers';

import {
  getDefaultReducers,
} from '../../src/Modules/getDefaultReducers';

type Mock = jest.Mock;

describe('getDefaultReducers unit tests.', () => {
  beforeEach(() => {
    (getDefaultAppReducers as Mock).mockClear();
  });

  it('Calls getDefaultAppReducers when producing the root reducer map.', () => {
    getDefaultReducers();
    expect((getDefaultAppReducers as Mock).mock.calls.length).toBe(1);
  });

  it('Spreads the product of getDefaultAppReducers into the return object.', () => {
    const appReducers = {
      one:   '1',
      two:   '2',
      three: '3',
    };

    (getDefaultAppReducers as Mock).mockImplementation(() => appReducers);

    /* Change to toContainsEqual after second reducer is added. */
    expect(getDefaultReducers()).toEqual(appReducers);
  });
});