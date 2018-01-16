import {
  AppActionTypes,
} from '../../../src/Enums/AppActionTypes';
import {
  ErrorAppAction,
} from '../../../src/Actions/App/ErrorAppAction';
import {
  isAction,
} from '../../../src/TypeGuards/isAction';
import {
  isAppAction,
} from '../../../src/TypeGuards/isAppAction';

describe('ErrorAppAction unit tests.', () => {  
  it('Has the correct type.', () => {
    expect(ErrorAppAction.type).toBe(AppActionTypes.Error);
  });

  it('Defaults to a value of false.', () => {
    expect(ErrorAppAction.value).toBe(false);
  });

  it('Disallows changing of the type.', () => {
    const func = () => (<any>ErrorAppAction.type) = 'foo';
    expect(func).toThrow();
  });

  it('Disallows changing of the value.', () => {
    const func = () => (<any>ErrorAppAction.value) = 'foo';
    expect(func).toThrow();
  });
});

describe('ErrorAppAction integration tests.', () => {
  it('Meets the isAction type guard.', () => {
    expect(isAction(ErrorAppAction)).toBe(true);
  });

  it('Meets the isAppAction type guard.', () => {
    expect(isAppAction(ErrorAppAction)).toBe(true);
  });
});