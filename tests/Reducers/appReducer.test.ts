import {
  AppActionTypes,
} from '../../src/Enums/AppActionTypes';
import {
  appReducer,
  strings,
} from '../../src/Reducers/appReducer';
import {
  IAppAction,
} from '../../src/Actions/App/IAppAction';

jest.mock('../../src/TypeGuards/isAppAction');
import {
  isAppAction,
} from '../../src/TypeGuards/isAppAction';

type Mock = jest.Mock;

describe('appReducer unit tests.', () => {
  beforeEach(() => {
    (isAppAction as any).mockClear();
    (isAppAction as any).mockImplementation(() => true);
  });

  it('Throws if the previousState argument is not a boolean.', () => {
    const func = () => appReducer(null, {} as IAppAction);
    expect(func).toThrow(strings.PREVIOUS_STATE_INVALID);
  });

  it('Calls isAppAction to determine the validity of the action.', () => {
    appReducer(true, {
      type: AppActionTypes.Done,
      value: true,
    } as IAppAction);

    expect((isAppAction as any).mock.calls.length).toBe(1);
  });

  it('Returns the value property if the action meets the isAppAction type guard.', () => {
    expect(appReducer(true, {
      type: AppActionTypes.Error,
      value: true,
    })).toBe(true);
  });

  it('Returns the previous state if the action does not meet the isAppAction type guard.', () => {
    (isAppAction as any).mockImplementation(() => false);
    expect((appReducer as any)()).toBe(false);
  });
});