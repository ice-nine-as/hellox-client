import {
  AppActionTypes,
} from '../../src/Enums/AppActionTypes';
import {
  feedReducer,
  strings,
} from '../../src/Reducers/feedReducer';
import {
  IAppAction,
} from '../../src/Actions/App/IAppAction';
import {
  IRssAction,
} from '../../src/Actions/App/IRssAction';
import {
  IRssFeed,
} from '../../src/Interfaces/IRssFeed';

/* Mocked */
import {
  isAppAction,
} from '../../src/TypeGuards/isAppAction';
jest.mock('../../src/TypeGuards/isAppAction');

import {
  isRssAction,
} from '../../src/TypeGuards/isRssAction';
jest.mock('../../src/TypeGuards/isRssAction');

import {
  isRssFeed,
} from '../../src/TypeGuards/isRssFeed';
jest.mock('../../src/TypeGuards/isRssFeed');

type Mock = jest.Mock;

describe('feedReducer unit tests.', () => {
  beforeEach(() => {
    // @ts-ignore
    isAppAction.mockClear();
    // @ts-ignore
    isAppAction.mockImplementation(() => true);
    
    // @ts-ignore
    isRssAction.mockClear();
    // @ts-ignore
    isRssAction.mockImplementation(() => true);
    
    // @ts-ignore
    isRssFeed.mockClear();
    // @ts-ignore
    isRssFeed.mockImplementation(() => true);
  });

  it('Throws if the previousState argument is not null and does not meet the isRssFeed type guard.', () => {
    // @ts-ignore
    isRssFeed.mockImplementationOnce(() => false);

    const func = () => {
      // @ts-ignore
      feedReducer('foo');
    };

    expect(func).toThrow(strings.PREVIOUS_STATE_INVALID);
  });

  it('Returns the previous state if the provided action does not meet the isRssAction type guard.', () => {
    // @ts-ignore
    isRssAction.mockImplementationOnce(() => false);

    expect(feedReducer(null, {} as IRssAction)).toBe(null);
  });

  it('Returns the previous state if the reducer is not bound.', () => {
    const reducer = feedReducer.bind(null);
    const val = reducer(null, {} as IRssAction);

    expect(val).toEqual(null);
  });

  it('Returns the previous state if the reducer does not have a key prop bound to it.', () => {
    const reducer = feedReducer.bind({});
    const val = reducer(
      null,
      { feedKey: 'foobar', });

    expect(val).toEqual(null);
  });

  it('Returns the action argument\'s value if the arguments are valid.', () => {
    const b = {} as IRssFeed;
    const a = {
      value: b,
    } as IRssAction;

    expect(feedReducer(null, a)).toBe(b);
  });
});