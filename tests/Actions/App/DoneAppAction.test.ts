import {
  AppActionTypes,
} from '../../../src/Enums/AppActionTypes';
import {
  DoneAppAction,
} from '../../../src/Actions/App/DoneAppAction';
import {
  isAction,
} from '../../../src/TypeGuards/isAction';
import {
  isAppAction,
} from '../../../src/TypeGuards/isAppAction';

describe('DoneAppAction unit tests.', () => {
  it('Has the correct type.', () => {
    expect(DoneAppAction.type).toBe(AppActionTypes.Done);
  });

  it('Defaults to a value of false.', () => {
    expect(DoneAppAction.value).toBe(false);
  });

  it('Disallows changing of the type.', () => {
    const func = () => (<any>DoneAppAction.type) = 'foo';
    expect(func).toThrow();
  });

  it('Disallows changing of the value.', () => {
    const func = () => (<any>DoneAppAction.value) = 'foo';
    expect(func).toThrow();
  });
});

describe('DoneAppAction integration tests.', () => {
  it('Meets the isAction type guard.', () => {
    expect(isAction(DoneAppAction)).toBe(true);
  });

  it('Meets the isAppAction type guard.', () => {
    expect(isAppAction(DoneAppAction)).toBe(true);
  });
});