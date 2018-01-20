import {
  isAction,
} from '../../../src/TypeGuards/isAction';
import {
  isLinkAction,
} from '../../../src/TypeGuards/isLinkAction';
import {
  NotFoundLinkAction,
} from '../../../src/Actions/Link/NotFoundLinkAction';
import {
  PageIdentifiers,
} from '../../../src/Enums/PageIdentifiers';

describe('NotFoundLinkAction unit tests.', () => {
  it('Has the correct type.', () => {
    expect(NotFoundLinkAction.type).toBe(PageIdentifiers.NotFound);
  });

  it('Defaults to a value of null.', () => {
    expect(NotFoundLinkAction.value).toBe(null);
  });

  it('Disallows changing of the type.', () => {
    const func = () => (<any>NotFoundLinkAction.type) = 'foo';
    expect(func).toThrow();
  });

  it('Disallows changing of the value.', () => {
    const func = () => (<any>NotFoundLinkAction.value) = 'foo';
    expect(func).toThrow();
  });
});

describe('NotFoundLinkAction integration tests.', () => {
  it('Meets the isAction type guard.', () => {
    expect(isAction(NotFoundLinkAction)).toBe(true);
  });

  it('Meets the isLinkAction type guard.', () => {
    expect(isLinkAction(NotFoundLinkAction)).toBe(true);
  });
})