import {
  AppActionTypes,
} from '../../../src/Enums/AppActionTypes';
import {
  HamburgerOpenAction,
} from '../../../src/Actions/App/HamburgerOpenAction';
import {
  isAction,
} from '../../../src/TypeGuards/isAction';
import {
  isAppAction,
} from '../../../src/TypeGuards/isAppAction';

describe('HamburgerOpenAction unit tests.', () => {
  it('Has the correct type.', () => {
    expect(HamburgerOpenAction.type).toBe(AppActionTypes.HamburgerOpen);
  });

  it('Defaults to a value of false.', () => {
    expect(HamburgerOpenAction.value).toBe(false);
  });

  it('Disallows changing of the type.', () => {
    const func = () => (<any>HamburgerOpenAction.type) = 'foo';
    expect(func).toThrow();
  });

  it('Disallows changing of the value.', () => {
    const func = () => (<any>HamburgerOpenAction.value) = 'foo';
    expect(func).toThrow();
  });
});

describe('DoneAppAction integration tests.', () => {
  it('Meets the isAction type guard.', () => {
    expect(isAction(HamburgerOpenAction)).toBe(true);
  });

  it('Meets the isAppAction type guard.', () => {
    expect(isAppAction(HamburgerOpenAction)).toBe(true);
  });
});