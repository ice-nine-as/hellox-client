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
  ServerErrorLinkAction,
} from '../../../src/Actions/Link/ServerErrorLinkAction';

describe('ServerErrorLinkAction unit tests.', () => {
  it('Has the correct type.', () => {
    expect(ServerErrorLinkAction.type).toBe(PageIdentifiers.ServerError);
  });

  it('Defaults to a value of null.', () => {
    expect(ServerErrorLinkAction.value).toBe(null);
  });

  it('Disallows changing of the type.', () => {
    const func = () => (<any>ServerErrorLinkAction.type) = 'foo';
    expect(func).toThrow();
  });

  it('Disallows changing of the value.', () => {
    const func = () => (<any>ServerErrorLinkAction.value) = 'foo';
    expect(func).toThrow();
  });
});

describe('ReadWriteLinkAction integration tests.', () => {
  it('Meets the isAction type guard.', () => {
    expect(isAction(ServerErrorLinkAction)).toBe(true);
  });

  it('Meets the isLinkAction type guard.', () => {
    expect(isLinkAction(ServerErrorLinkAction)).toBe(true);
  });
});