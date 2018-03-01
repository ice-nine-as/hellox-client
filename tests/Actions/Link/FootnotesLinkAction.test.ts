import {
  FootnotesLinkAction,
} from '../../../src/Actions/Link/FootnotesLinkAction';
import {
  isAction,
} from '../../../src/TypeGuards/isAction';
import {
  isLinkAction,
} from '../../../src/TypeGuards/isLinkAction';
import {
  PageIdentifiers,
} from '../../../src/Enums/PageIdentifiers';

describe('FootnotesLinkAction unit tests.', () => {
  it('Has the correct type.', () => {
    expect(FootnotesLinkAction.type).toBe(PageIdentifiers.Footnotes);
  });

  it('Defaults to a value of null.', () => {
    expect(FootnotesLinkAction.value).toBe(null);
  });

  it('Disallows changing of the type.', () => {
    const func = () => (<any>FootnotesLinkAction.type) = 'foo';
    expect(func).toThrow();
  });

  it('Disallows changing of the value.', () => {
    const func = () => (<any>FootnotesLinkAction.value) = 'foo';
    expect(func).toThrow();
  });
});

describe('FootnotesLinkAction integration tests.', () => {
  it('Meets the isAction type guard.', () => {
    expect(isAction(FootnotesLinkAction)).toBe(true);
  });

  it('Meets the isLinkAction type guard.', () => {
    expect(isLinkAction(FootnotesLinkAction)).toBe(true);
  });
});