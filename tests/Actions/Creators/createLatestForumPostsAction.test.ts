import {
  AppActionTypes,
} from '../../../src/Enums/AppActionTypes';
import {
  FeedKeys,
} from '../../../src/Enums/FeedKeys';
import {
  strings,
  createLatestForumPostsAction,
} from '../../../src/Actions/Creators/createLatestForumPostsAction';
import {
  isAction,
} from '../../../src/TypeGuards/isAction';
import {
  isAppAction,
} from '../../../src/TypeGuards/isAppAction';
import {
  PageIdentifiers,
} from '../../../src/Enums/PageIdentifiers.js';
import {
  LatestForumPostsAction,
} from '../../../src/Actions/App/LatestForumPostsAction';

type Mock = jest.Mock;

describe('createLatestForumPostsAction unit tests.', () => {
  beforeEach(() => {
  });

  it('Has the correct type.', () => {
    expect(createLatestForumPostsAction(LatestForumPostsAction, null).type).toBe(AppActionTypes.LatestForumPosts);
  });

  it('Assigns the correct value.', () => {
    expect(createLatestForumPostsAction(LatestForumPostsAction, 'foo').value).toBe('foo');
  });

  it('Disallows changing of the type.', () => {
    const func = () => (<any>createLatestForumPostsAction(LatestForumPostsAction, {})).type = 'foo';
    expect(func).toThrow();
  });

  it('Disallows changing of the value.', () => {
    const func = () => (<any>createLatestForumPostsAction(LatestForumPostsAction, {})).value = 'foo';
    expect(func).toThrow();
  });

  it('Throws if the LatestForumPostsAction argument does not meet the isLinkAction type guard.', () => {
    // @ts-ignore
    const func = () => createLatestForumPostsAction();
    expect(func).toThrow(strings.FORUM_POSTS_ACTION_INVALID);
  });

  it('Does not throw if the value argument is null.', () => {
    const func = () => createLatestForumPostsAction(LatestForumPostsAction, null);
    expect(func).not.toThrow();
  });
});

describe('createLatestForumPostsAction integration tests.', () => {
  it('Meets the isAction type guard.', () => {
    expect(isAction(createLatestForumPostsAction(LatestForumPostsAction, {}))).toBe(true);
  });

  it('Meets the isAppAction type guard.', () => {
    expect(isAppAction(createLatestForumPostsAction(LatestForumPostsAction, {}))).toBe(true);
  });
});