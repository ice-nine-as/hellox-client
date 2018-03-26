import {
  ArticleLinkAction,
} from '../../../src/Actions/Link/ArticleLinkAction';
import {
  isAction,
} from '../../../src/TypeGuards/isAction';
import {
  isLinkAction,
} from '../../../src/TypeGuards/isLinkAction';
import {
  PageIdentifiers,
} from '../../../src/Enums/PageIdentifiers';

describe('ArticleLinkAction unit tests.', () => {
  it('Has the correct type.', () => {
    expect(ArticleLinkAction.type).toBe(PageIdentifiers.Article);
  });

  it('Defaults to a value of null.', () => {
    expect(ArticleLinkAction.value).toBe(null);
  });

  it('Defaults to a payload of {}.', () => {
    expect(ArticleLinkAction.payload).toEqual({});
  });

  it('Disallows changing of the type.', () => {
    const func = () => (<any>ArticleLinkAction.type) = 'foo';
    expect(func).toThrow();
  });

  it('Disallows changing of the value.', () => {
    const func = () => (<any>ArticleLinkAction.value) = 'foo';
    expect(func).toThrow();
  });
});

describe('ArticleLinkAction integration tests.', () => {
  it('Meets the isAction type guard.', () => {
    expect(isAction(ArticleLinkAction)).toBe(true);
  });

  it('Meets the isLinkAction type guard.', () => {
    expect(isLinkAction(ArticleLinkAction)).toBe(true);
  });
});