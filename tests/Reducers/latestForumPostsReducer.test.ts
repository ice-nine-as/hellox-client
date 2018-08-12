import {
  AppActionTypes,
} from '../../src/Enums/AppActionTypes';
import {
  latestForumPostsReducer,
  strings,
} from '../../src/Reducers/latestForumPostsReducer';
import {
  IAppAction,
} from '../../src/Actions/App/IAppAction';
import {
  ILatestForumTopicsAction,
} from '../../src/Actions/App/ILatestForumPostsAction';
import {
  ILatestForumTopicsFeed,
} from '../../src/Interfaces/ILatestForumPostsFeed';

/* Mocked */
import {
  isAppAction,
} from '../../src/TypeGuards/isAppAction';
jest.mock('../../src/TypeGuards/isAppAction');

import {
  isLatestForumPostsFeed,
} from '../../src/TypeGuards/isLatestForumPostsFeed';
jest.mock('../../src/TypeGuards/isLatestForumPostsFeed');

type Mock = jest.Mock;

describe('latestForumPostsReducer unit tests.', () => {
  beforeEach(() => {
    // @ts-ignore
    isAppAction.mockClear();
    // @ts-ignore
    isAppAction.mockImplementation(() => true);

    // @ts-ignore
    isLatestForumPostsFeed.mockClear();
    // @ts-ignore
    isLatestForumPostsFeed.mockImplementation(() => true);
  });

  it('Throws if the previousState argument is not null and does not meet the isLatestForumPostsFeed type guard.', () => {
    // @ts-ignore
    isLatestForumPostsFeed.mockImplementationOnce(() => false);

    const func = () => {
      // @ts-ignore
      latestForumPostsReducer('foo');
    };

    expect(func).toThrow(strings.PREVIOUS_STATE_INVALID);
  });

  it('The previousState argument defaults to null.', () => {
    expect(
      // @ts-ignore
      latestForumPostsReducer()
    ).toBe(null);
  });

  it('Returns the previous state if the action argument does not meet the isAppAction type guard.', () => {
    // @ts-ignore
    isAppAction.mockImplementationOnce(() => false);

    const a = {} as any;
    const b = {} as any;

    const val = latestForumPostsReducer(a, b);
    expect(val).toBe(a);
  });

  it('Returns the previous state if the action argument\'s type prop is not AppActionTypes.LatestForumPosts.', () => {
    expect(latestForumPostsReducer({} as any, { value: false, type: AppActionTypes.Rss, } as any)).toEqual({});
  });

  it('Returns the previous state if the action argument\'s value prop does not meet the isLatestForumPostsFeed type guard.', () => {
    let counter = 0;
    // @ts-ignore
    isLatestForumPostsFeed.mockImplementation(() => {
      counter += 1;

      if (counter === 1) {
        return true;
      }

      return false;
    });

    const val = latestForumPostsReducer({} as any, { value: 'foobar', type: AppActionTypes.LatestForumPosts, } as any);
    expect(val).toEqual({});
  });

  it('Returns the new value if the input was valid.', () => {
    const a = {} as ILatestForumTopicsFeed;
    const val = latestForumPostsReducer(null, {
      value: a,
      type: AppActionTypes.LatestForumPosts,
    } as any);

    expect(val).toBe(a);
  });
});