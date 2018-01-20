import {
  AppActionTypes,
} from '../../../src/Enums/AppActionTypes';
import {
  LoadingAppAction,
} from '../../../src/Actions/App/LoadingAppAction';
import {
  isAction,
} from '../../../src/TypeGuards/isAction';
import {
  isAppAction,
} from '../../../src/TypeGuards/isAppAction';

describe('LoadingAppAction unit tests.', () => {
  it('Has the correct type.', () => {
    expect(LoadingAppAction.type).toBe(AppActionTypes.Loading);
  });

  it('Defaults to a value of false.', () => {
    expect(LoadingAppAction.value).toBe(false);
  });

  it('Disallows changing of the type.', () => {
    const func = () => (<any>LoadingAppAction.type) = 'foo';
    expect(func).toThrow();
  });

  it('Disallows changing of the value.', () => {
    const func = () => (<any>LoadingAppAction.value) = 'foo';
    expect(func).toThrow();
  });
});

describe('LoadingAppAction unit tests.', () => {
  it('Meets the isAction type guard.', () => {
    expect(isAction(LoadingAppAction)).toBe(true);
  });

  it('Meets the isAppAction type guard.', () => {
    expect(isAppAction(LoadingAppAction)).toBe(true);
  });
});