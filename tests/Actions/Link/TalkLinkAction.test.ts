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
  TalkLinkAction,
} from '../../../src/Actions/Link/TalkLinkAction';

describe('TalkLinkAction unit tests.', () => {
  it('Has the correct type.', () => {
    expect(TalkLinkAction.type).toBe(PageIdentifiers.Talk);
  });

  it('Defaults to a value of null.', () => {
    expect(TalkLinkAction.value).toBe(null);
  });

  it('Disallows changing of the type.', () => {
    const func = () => (<any>TalkLinkAction.type) = 'foo';
    expect(func).toThrow();
  });

  it('Disallows changing of the value.', () => {
    const func = () => (<any>TalkLinkAction.value) = 'foo';
    expect(func).toThrow();
  });
});

describe('ReadWriteLinkAction integration tests.', () => {
  it('Meets the isAction type guard.', () => {
    expect(isAction(TalkLinkAction)).toBe(true);
  });

  it('Meets the isLinkAction type guard.', () => {
    expect(isLinkAction(TalkLinkAction)).toBe(true);
  });
});