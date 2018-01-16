import {
  ListenLinkAction,
} from '../../../src/Actions/Link/ListenLinkAction';
import {
  isAction,
} from '../../../src/TypeGuards/isAction';
import {
  isLinkAction,
} from '../../../src/TypeGuards/isLinkAction';
import {
  PageIdentifiers,
} from '../../../src/Enums/PageIdentifiers';

describe('ListenLinkAction unit tests.', () => {
  it('Has the correct type.', () => {
    expect(ListenLinkAction.type).toBe(PageIdentifiers.Listen);
  });

  it('Defaults to a value of null.', () => {
    expect(ListenLinkAction.value).toBe(null);
  });

  it('Disallows changing of the type.', () => {
    const func = () => (<any>ListenLinkAction.type) = 'foo';
    expect(func).toThrow();
  });

  it('Disallows changing of the value.', () => {
    const func = () => (<any>ListenLinkAction.value) = 'foo';
    expect(func).toThrow();
  });
});

describe('ListenLinkAction integration tests.', () => {
  it('Meets the isAction type guard.', () => {
    expect(isAction(ListenLinkAction)).toBe(true);
  });

  it('Meets the isLinkAction type guard.', () => {
    expect(isLinkAction(ListenLinkAction)).toBe(true);
  });
})