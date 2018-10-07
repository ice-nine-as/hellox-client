import {
  isAppAction,
} from '../../src/TypeGuards/isAppAction';

import {
  isAction,
} from '../../src/TypeGuards/isAction';
jest.mock('../../src/TypeGuards/isAction');
import {
  isAppActionType,
} from '../../src/TypeGuards/isAppActionType';
jest.mock('../../src/TypeGuards/isAppActionType');

describe('isAppAction unit tests.', () => {
  it('Rejects if the argument does not meet the isAction type guard.', () => {
    (isAction as any).mockImplementationOnce(() => false);
    expect(isAppAction({})).toBe(false);
  });

  it('Rejects if the argument\'s type property does not meet the isAppActionType type guard.', () => {
    (isAction as any).mockImplementationOnce(() => true);
    (isAppActionType as any).mockImplementationOnce(() => false);
    expect(isAppAction({})).toBe(false);
  });

  it('Passes if the argument is an object with a type string and a value property.', () => {
    (isAction as any).mockImplementationOnce(() => true);
    (isAppActionType as any).mockImplementationOnce(() => true);
    expect(isAppAction({})).toBe(true);
  });
});