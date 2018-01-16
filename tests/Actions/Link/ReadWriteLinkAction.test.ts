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
  ReadWriteLinkAction,
} from '../../../src/Actions/Link/ReadWriteLinkAction';

describe('ReadWriteLinkAction unit tests.', () => {
  it('Has the correct type.', () => {
    expect(ReadWriteLinkAction.type).toBe(PageIdentifiers.ReadWrite);
  });

  it('Defaults to a value of null.', () => {
    expect(ReadWriteLinkAction.value).toBe(null);
  });

  it('Disallows changing of the type.', () => {
    const func = () => (<any>ReadWriteLinkAction.type) = 'foo';
    expect(func).toThrow();
  });

  it('Disallows changing of the value.', () => {
    const func = () => (<any>ReadWriteLinkAction.value) = 'foo';
    expect(func).toThrow();
  });
});

describe('ReadWriteLinkAction integration tests.', () => {
  it('Meets the isAction type guard.', () => {
    expect(isAction(ReadWriteLinkAction)).toBe(true);
  });

  it('Meets the isLinkAction type guard.', () => {
    expect(isLinkAction(ReadWriteLinkAction)).toBe(true);
  });
})