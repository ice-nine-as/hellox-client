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
  WriteLinkAction,
} from '../../../src/Actions/Link/WriteLinkAction';

describe('WriteLinkAction unit tests.', () => {
  it('Has the correct type.', () => {
    expect(WriteLinkAction.type).toBe(PageIdentifiers.Write);
  });

  it('Defaults to a value of null.', () => {
    expect(WriteLinkAction.value).toBe(null);
  });

  it('Disallows changing of the type.', () => {
    const func = () => (<any>WriteLinkAction.type) = 'foo';
    expect(func).toThrow();
  });

  it('Disallows changing of the value.', () => {
    const func = () => (<any>WriteLinkAction.value) = 'foo';
    expect(func).toThrow();
  });
});

describe('ReadWriteLinkAction integration tests.', () => {
  it('Meets the isAction type guard.', () => {
    expect(isAction(WriteLinkAction)).toBe(true);
  });

  it('Meets the isLinkAction type guard.', () => {
    expect(isLinkAction(WriteLinkAction)).toBe(true);
  });
});