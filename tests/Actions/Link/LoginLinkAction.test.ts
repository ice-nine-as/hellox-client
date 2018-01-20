import {
  isAction,
} from '../../../src/TypeGuards/isAction';
import {
  isLinkAction,
} from '../../../src/TypeGuards/isLinkAction';
import {
  LoginLinkAction,
} from '../../../src/Actions/Link/LoginLinkAction';
import {
  PageIdentifiers,
} from '../../../src/Enums/PageIdentifiers';

describe('LoginLinkAction unit tests.', () => {
  it('Has the correct type.', () => {
    expect(LoginLinkAction.type).toBe(PageIdentifiers.Login);
  });

  it('Defaults to a value of null.', () => {
    expect(LoginLinkAction.value).toBe(null);
  });

  it('Disallows changing of the type.', () => {
    const func = () => (<any>LoginLinkAction.type) = 'foo';
    expect(func).toThrow();
  });

  it('Disallows changing of the value.', () => {
    const func = () => (<any>LoginLinkAction.value) = 'foo';
    expect(func).toThrow();
  });
});

describe('LoginLinkAction integration tests.', () => {
  it('Meets the isAction type guard.', () => {
    expect(isAction(LoginLinkAction)).toBe(true);
  });

  it('Meets the isLinkAction type guard.', () => {
    expect(isLinkAction(LoginLinkAction)).toBe(true);
  });
})