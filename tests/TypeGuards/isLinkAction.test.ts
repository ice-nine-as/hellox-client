import {
  isLinkAction,
} from '../../src/TypeGuards/isLinkAction';

import {
  isPageIdentifier,
} from '../../src/TypeGuards/isPageIdentifier';
jest.mock('../../src/TypeGuards/isPageIdentifier');

describe('isLinkAction unit tests.', () => {
  it('Rejects if the argument is not of type object.', () => {
    expect(isLinkAction(false)).toBe(false);
  });

  it('Rejects if the argument is null.', () => {
    expect(isLinkAction(null)).toBe(false);
  });

  it('Rejects if the argument\'s type property does not meet the isPageIdentifier type guard.', () => {
    (isPageIdentifier as any).mockImplementationOnce(() => false);
    expect(isLinkAction({})).toBe(false);
  });

  it('Rejects if the payload property of the argument is not of type object.', () => {
    (isPageIdentifier as any).mockImplementationOnce(() => true);
    expect(isLinkAction({})).toBe(false);
  });

  it('Rejects if the payload property of the argument is null.', () => {
    (isPageIdentifier as any).mockImplementationOnce(() => true);
    expect(isLinkAction({ payload: null, })).toBe(false);
  });

  it('Passes if the argument is an object with a type string and a value property.', () => {
    (isPageIdentifier as any).mockImplementationOnce(() => true);
    expect(isLinkAction({ payload: {}, })).toBe(true);
  });
});