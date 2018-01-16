import {
  isAction,
} from '../../../src/TypeGuards/isAction';
import {
  isLinkAction,
} from '../../../src/TypeGuards/isLinkAction';
import {
  LogoutLinkAction,
} from '../../../src/Actions/Link/LogoutLinkAction';
import {
  PageIdentifiers,
} from '../../../src/Enums/PageIdentifiers';

describe('LogoutLinkAction unit tests.', () => {
  it('Has the correct type.', () => {
    expect(LogoutLinkAction.type).toBe(PageIdentifiers.Logout);
  });

  it('Defaults to a value of null.', () => {
    expect(LogoutLinkAction.value).toBe(null);
  });

  it('Disallows changing of the type.', () => {
    const func = () => (<any>LogoutLinkAction.type) = 'foo';
    expect(func).toThrow();
  });

  it('Disallows changing of the value.', () => {
    const func = () => (<any>LogoutLinkAction.value) = 'foo';
    expect(func).toThrow();
  });
});

describe('LogoutLinkAction integration tests.', () => {
  it('Meets the isAction type guard.', () => {
    expect(isAction(LogoutLinkAction)).toBe(true);
  });

  it('Meets the isLinkAction type guard.', () => {
    expect(isLinkAction(LogoutLinkAction)).toBe(true);
  });
})