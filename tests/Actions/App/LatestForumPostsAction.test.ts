import {
  AppActionTypes,
} from '../../../src/Enums/AppActionTypes';
import {
  LatestForumPostsAction,
} from '../../../src/Actions/App/LatestForumPostsAction';
import {
  isAction,
} from '../../../src/TypeGuards/isAction';
import {
  isAppAction,
} from '../../../src/TypeGuards/isAppAction';

describe('LatestForumPostsAction unit tests.', () => {
  it('Has the correct type.', () => {
    expect(LatestForumPostsAction.type).toBe(AppActionTypes.LatestForumPosts);
  });

  it('Defaults to a value of false.', () => {
    expect(LatestForumPostsAction.value).toBe(null);
  });

  it('Disallows changing of the type.', () => {
    const func = () => (<any>LatestForumPostsAction.type) = 'foo';
    expect(func).toThrow();
  });

  it('Disallows changing of the value.', () => {
    const func = () => (<any>LatestForumPostsAction.value) = 'foo';
    expect(func).toThrow();
  });
});

describe('LatestForumPostsAction integration tests.', () => {
  it('Meets the isAction type guard.', () => {
    expect(isAction(LatestForumPostsAction)).toBe(true);
  });

  it('Meets the isAppAction type guard.', () => {
    expect(isAppAction(LatestForumPostsAction)).toBe(true);
  });
});