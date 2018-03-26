import {
  AppActionTypes,
} from '../../../src/Enums/AppActionTypes';
import {
  createAppAction,
} from '../../../src/Actions/Creators/createAppAction';
import {
  DoneAppAction,
} from '../../../src/Actions/App/DoneAppAction';
import {
  isAction,
} from '../../../src/TypeGuards/isAction';
import {
  isAppAction,
} from '../../../src/TypeGuards/isAppAction';

describe('createAppAction unit tests.', () => {
  it('Has the correct type.', () => {
    expect(createAppAction(DoneAppAction, 0).type).toBe(AppActionTypes.Done);
  });

  it('Assigns the correct value.', () => {
    expect(createAppAction(DoneAppAction, true).value).toBe(true);
  });

  it('Disallows changing of the type.', () => {
    const func = () => (<any>createAppAction(DoneAppAction, 0)).type = 'foo';
    expect(func).toThrow();
  });

  it('Disallows changing of the value.', () => {
    const func = () => (<any>createAppAction(DoneAppAction, 0)).value = 'foo';
    expect(func).toThrow();
  });
});

describe('createAppAction integration tests.', () => {
  it('Meets the isAction type guard.', () => {
    expect(isAction(createAppAction(DoneAppAction, 0))).toBe(true);
  });

  it('Meets the isAppAction type guard.', () => {
    expect(isAppAction(createAppAction(DoneAppAction, 0))).toBe(true);
  });
});