import {
  isAction,
} from '../../../src/TypeGuards/isAction';
import {
  isLinkAction,
} from '../../../src/TypeGuards/isLinkAction';
import {
  PageIdentifiers,
} from '../../../src/Enums/PageIdentifiers';
import {
  ReadDiscussLinkAction,
} from '../../../src/Actions/Link/ReadDiscussLinkAction';

describe('ReadDiscussLinkAction unit tests.', () => {
  it('Has the correct type.', () => {
    expect(ReadDiscussLinkAction.type).toBe(PageIdentifiers.ReadDiscuss);
  });

  it('Defaults to a value of null.', () => {
    expect(ReadDiscussLinkAction.value).toBe(null);
  });

  it('Disallows changing of the type.', () => {
    const func = () => (<any>ReadDiscussLinkAction.type) = 'foo';
    expect(func).toThrow();
  });

  it('Disallows changing of the value.', () => {
    const func = () => (<any>ReadDiscussLinkAction.value) = 'foo';
    expect(func).toThrow();
  });
});

describe('ReadDiscussLinkAction integration tests.', () => {
  it('Meets the isAction type guard.', () => {
    expect(isAction(ReadDiscussLinkAction)).toBe(true);
  });

  it('Meets the isLinkAction type guard.', () => {
    expect(isLinkAction(ReadDiscussLinkAction)).toBe(true);
  });
})