import {
  AboutLinkAction,
} from '../../../src/Actions/Link/AboutLinkAction';
import {
  isAction,
} from '../../../src/TypeGuards/isAction';
import {
  isLinkAction,
} from '../../../src/TypeGuards/isLinkAction';
import {
  PageIdentifiers,
} from '../../../src/Enums/PageIdentifiers';

describe('AboutLinkAction unit tests.', () => {
  it('Has the correct type.', () => {
    expect(AboutLinkAction.type).toBe(PageIdentifiers.About);
  });

  it('Defaults to a value of null.', () => {
    expect(AboutLinkAction.value).toBe(null);
  });

  it('Disallows changing of the type.', () => {
    const func = () => (<any>AboutLinkAction.type) = 'foo';
    expect(func).toThrow();
  });

  it('Disallows changing of the value.', () => {
    const func = () => (<any>AboutLinkAction.value) = 'foo';
    expect(func).toThrow();
  });
});

describe('AboutLinkAction integration tests.', () => {
  it('Meets the isAction type guard.', () => {
    expect(isAction(AboutLinkAction)).toBe(true);
  });

  it('Meets the isLinkAction type guard.', () => {
    expect(isLinkAction(AboutLinkAction)).toBe(true);
  });
})