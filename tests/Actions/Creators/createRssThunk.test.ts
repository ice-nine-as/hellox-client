import {
  createRssThunk,
  strings,
} from '../../../src/Actions/Creators/createRssThunk';
import {
  FeedKeys,
} from '../../../src/Enums/FeedKeys';
import {
  isAction,
} from '../../../src/TypeGuards/isAction';
import {
  isAppAction,
} from '../../../src/TypeGuards/isAppAction';
import {
  isRssAction,
} from '../../../src/TypeGuards/isRssAction';

/* Mocked */
import {
  composeFeeds,
} from '../../../src/Functions/composeFeeds';
jest.mock('../../../src/Functions/composeFeeds');

import {
  downloadFeed,
} from '../../../src/Functions/downloadFeed';
jest.mock('../../../src/Functions/downloadFeed');

import {
  isFeedKey,
} from '../../../src/TypeGuards/isFeedKey';
jest.mock('../../../src/TypeGuards/isFeedKey');

import {
  isRssFeed,
} from '../../../src/TypeGuards/isRssFeed';
import { AppActionTypes } from '../../../src/Enums/AppActionTypes';
jest.mock('../../../src/TypeGuards/isRssFeed');

describe('createRssThunk unit tests.', () => {
  beforeEach(() => {
    // @ts-ignore
    downloadFeed.mockClear();
    // @ts-ignore
    downloadFeed.mockImplementation(() => true);
    // @ts-ignore
    isFeedKey.mockClear();
    // @ts-ignore
    isFeedKey.mockImplementation(() => true);
    // @ts-ignore
    isRssFeed.mockClear();
    // @ts-ignore
    isRssFeed.mockImplementation(() => true);
  });

  it('Throws if the feedKey argument does not meet the isFeedKey type guard.', () => {
    // @ts-ignore
    isFeedKey.mockImplementationOnce(() => false);
    // @ts-ignore
    const func = () => createRssThunk({});
    expect(func).toThrow(strings.FEED_KEY_INVALID);
  });

  it('Returns a function.', () => {
    // @ts-ignore
    expect(typeof createRssThunk({})).toBe('function');
  });

  it('Returns a function which returns a promise.', () => {
    const func = createRssThunk({
      feedKey: FeedKeys.NewsFull,
    });

    expect('then' in func(jest.fn())).toBe(true);
  });

  it('Throws if the result of downloadFeed is falsy.', async () => {
    expect.assertions(1);
    
    // @ts-ignore
    downloadFeed.mockImplementationOnce(() => false);

    const func = createRssThunk({
      feedKey: FeedKeys.NewsFull,
    });

    await expect(func(jest.fn())).rejects.toEqual(new Error(strings.FEED_RESPONSE_INVALID));
  });

  it('Throws if the result of downloadFeed is truthy but does not meet the isRssFeed type guard.', async () => {
    expect.assertions(1);

    // @ts-ignore
    isRssFeed.mockImplementationOnce(() => false);

    const func = createRssThunk({
      feedKey: FeedKeys.NewsFull,
    });

    await expect(func(jest.fn())).rejects.toEqual(new Error(strings.FEED_RESPONSE_INVALID));
  });

  it('Passes the RssAction, the feedKey argument, and the feed produced by downloadFeed, through the action creator to dispatch, if no id is provided.', async () => {
    const items = [ Symbol('test'), ];

    // @ts-ignore
    downloadFeed.mockImplementationOnce(() => ({
      items,
    }));

    const func = createRssThunk({
      feedKey: FeedKeys.NewsFull,
    });

    const mockFn = jest.fn();

    await func(mockFn);

    expect(mockFn.mock.calls).toEqual([
      [
        {
          feedKey: FeedKeys.NewsFull,
          type: AppActionTypes.Rss,
          value: {
            currentOffset: 1,
            items,
          },
        }
      ],
    ]);
  });
});

it('Adds an offset of 0 to the resultant feed when the id argument prop is set.', async () => {
  const items = [ Symbol('test'), ];

  // @ts-ignore
  downloadFeed.mockImplementationOnce(() => ({
    items,
  }));

  const func = createRssThunk({
    feedKey: FeedKeys.NewsFull,
    id: '1',
  });

  const mockFn = jest.fn();

  await func(mockFn);

  expect(mockFn.mock.calls).toEqual([
    [
      {
        feedKey: FeedKeys.NewsFull,
        type: AppActionTypes.Rss,
        value: {
          currentOffset: 0,
          items,
        },
      }
    ],
  ]);
});

it('Adds computed offsets to a provided, valid offset argument prop.', async () => {
  const items = [ Symbol('test'), ];

  // @ts-ignore
  downloadFeed.mockImplementationOnce(() => ({
    items,
  }));
  
  const func = createRssThunk({
    feedKey: FeedKeys.NewsTeasers,
    offset: 2,
  });

  const mockFn = jest.fn();

  await func(mockFn);

  expect(mockFn.mock.calls).toEqual([
    [
      {
        type: AppActionTypes.Rss,
        feedKey: FeedKeys.NewsTeasers,
        value: {
          currentOffset: 3,
          items,
        },
      }
    ],
  ]);
});

it('Composes feeds when a valid composeWith argument prop is provided, and combines offsets.', async () => {
  const itemsOne = [ Symbol('test'), ];
  const itemsTwo = [ Symbol('testTwo'), ];

  const composeWith = {
    feedKey: FeedKeys.NewsTeasers,
    items: itemsOne,
    currentOffset: 1,
  };

  // @ts-ignore
  downloadFeed.mockImplementationOnce(() => ({
    items: itemsTwo,
  }));

  // Bug? Not sure why these are necessary.
  // @ts-ignore
  isFeedKey.mockImplementation(() => true);
  // @ts-ignore
  isRssFeed.mockImplementation(() => true);
  
  // @ts-ignore
  const func = createRssThunk({
    composeWith,
    feedKey: FeedKeys.NewsTeasers,
  });

  // @ts-ignore
  composeFeeds.mockImplementationOnce((aa, bb) => ({
    duplicates: 0,
    feed: {
      items: itemsOne.concat(itemsTwo),
    },
  }));

  const mockFn = jest.fn();

  await func(mockFn);

  expect(mockFn.mock.calls).toEqual([
    [
      {
        type: AppActionTypes.Rss,
        feedKey: FeedKeys.NewsTeasers,
        value: {
          currentOffset: 2,
          items: itemsOne.concat(itemsTwo),
        },
      }
    ],
  ]);
});

describe('createRssThunk integration tests.', () => {
  beforeEach(() => {
    // @ts-ignore
    composeFeeds.mockClear();
    // @ts-ignore
    composeFeeds.mockImplementation((aa, bb) => bb);
    // @ts-ignore
    downloadFeed.mockClear();
    // @ts-ignore
    downloadFeed.mockImplementation(() => ({
      items: [ 1, 2, 3, ],
    }));
    // @ts-ignore
    isFeedKey.mockClear();
    // @ts-ignore
    isFeedKey.mockImplementation(() => true);
    // @ts-ignore
    isRssFeed.mockClear();
    // @ts-ignore
    isRssFeed.mockImplementation(() => true);
  });

  it('Returns a Promise that produces an action which meets the isAction type guard.', async () => {
    const func = createRssThunk({
      feedKey: FeedKeys.NewsTeasers,
    });

    const action = await func(jest.fn((aa) => aa));
    expect(isAction(action)).toBe(true);
  });

  it('Returns a Promise that produces an action which meets the isAppAction type guard.', async () => {
    const func = createRssThunk({
      feedKey: FeedKeys.NewsTeasers,
    });

    const action = await func(jest.fn((aa) => aa));
    expect(isAppAction(action)).toBe(true);
  });

  it('Returns a Promise that produces an action which meets the isRssAction type guard.', async () => {
    const func = createRssThunk({
      feedKey: FeedKeys.NewsTeasers,
    });

    const action = await func(jest.fn((aa) => aa));
    expect(isRssAction(action)).toBe(true);
  });
});