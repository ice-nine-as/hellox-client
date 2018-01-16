import {
  AskLinkAction,
} from '../../../src/Actions/Link/AskLinkAction';
import {
  isAction,
} from '../../../src/TypeGuards/isAction';
import {
  isLinkAction,
} from '../../../src/TypeGuards/isLinkAction';
import {
  PageIdentifiers,
} from '../../../src/Enums/PageIdentifiers';

describe('AskLinkAction unit tests.', () => {
  it('Has the correct type.', () => {
    expect(AskLinkAction.type).toBe(PageIdentifiers.Ask);
  });

  it('Defaults to a value of null.', () => {
    expect(AskLinkAction.value).toBe(null);
  });

  it('Disallows changing of the type.', () => {
    const func = () => (<any>AskLinkAction.type) = 'foo';
    expect(func).toThrow();
  });

  it('Disallows changing of the value.', () => {
    const func = () => (<any>AskLinkAction.value) = 'foo';
    expect(func).toThrow();
  });
});

describe('AskLinkAction integration tests.', () => {
  it('Meets the isAction type guard.', () => {
    expect(isAction(AskLinkAction)).toBe(true);
  });

  it('Meets the isLinkAction type guard.', () => {
    expect(isLinkAction(AskLinkAction)).toBe(true);
  });
})