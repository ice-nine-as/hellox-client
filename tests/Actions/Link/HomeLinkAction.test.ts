import {
  HomeLinkAction,
} from '../../../src/Actions/Link/HomeLinkAction';
import {
  isAction,
} from '../../../src/TypeGuards/isAction';
import {
  isLinkAction,
} from '../../../src/TypeGuards/isLinkAction';
import {
  PageIdentifiers,
} from '../../../src/Enums/PageIdentifiers';

describe('HomeLinkAction unit tests.', () => {
  it('Has the correct type.', () => {
    expect(HomeLinkAction.type).toBe(PageIdentifiers.Home);
  });

  it('Defaults to a value of null.', () => {
    expect(HomeLinkAction.value).toBe(null);
  });

  it('Disallows changing of the type.', () => {
    const func = () => (<any>HomeLinkAction.type) = 'foo';
    expect(func).toThrow();
  });

  it('Disallows changing of the value.', () => {
    const func = () => (<any>HomeLinkAction.value) = 'foo';
    expect(func).toThrow();
  });
});

describe('HomeLinkAction integration tests.', () => {
  it('Meets the isAction type guard.', () => {
    expect(isAction(HomeLinkAction)).toBe(true);
  });

  it('Meets the isLinkAction type guard.', () => {
    expect(isLinkAction(HomeLinkAction)).toBe(true);
  });
})