import {
  AppActionTypes,
} from '../../src/Enums/AppActionTypes';
import {
  isRssAction,
} from '../../src/TypeGuards/isRssAction';

import {
  isAppAction,
} from '../../src/TypeGuards/isAppAction';
jest.mock('../../src/TypeGuards/isAppAction');
import {
  isRssFeed,
} from '../../src/TypeGuards/isRssFeed';
jest.mock('../../src/TypeGuards/isRssFeed');

describe('isRssAction unit tests.', () => {
  it('Rejects if the argument does not meet the isAppAction type guard.', () => {
    (isAppAction as any).mockImplementationOnce(() => false);
    expect(isRssAction({})).toBe(false);
  });

  it('Rejects if the argument\'s type property is not AppActionTypes.Rss.', () => {
    (isAppAction as any).mockImplementationOnce(() => true);
    expect(isRssAction({ type: AppActionTypes.Error, value: null, })).toBe(false);
  });

  it('Rejects if the value property is not null nor meets the isRssFeed type guard.', () => {
    (isAppAction as any).mockImplementationOnce(() => true);
    expect(isRssAction({ type: AppActionTypes.Rss, value: 'foo', })).toBe(false);
  });

  it('Passes if the argument is an object with type AppActionTypes.Rss and a value of null.', () => {
    (isAppAction as any).mockImplementationOnce(() => true);
    expect(isRssAction({ type: AppActionTypes.Rss, value: null, })).toBe(true);
  });

  it('Passes if the argument is an object with type AppActionTypes.Rss and a value which meets the isRssFeed type guard.', () => {
    (isAppAction as any).mockImplementationOnce(() => true); 
    (isRssFeed as any).mockImplementationOnce(() => true); 
    expect(isRssAction({ type: AppActionTypes.Rss, value: 'foo', })).toBe(true);
  });
});