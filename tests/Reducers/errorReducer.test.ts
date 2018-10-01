import {
  AppActionTypes,
} from '../../src/Enums/AppActionTypes';
import {
  errorReducer,
  strings,
} from '../../src/Reducers/errorReducer';
import {
  IAppAction,
} from '../../src/Actions/App/IAppAction';

/* Mocked */
import {
  isAppAction,
} from '../../src/TypeGuards/isAppAction';
jest.mock('../../src/TypeGuards/isAppAction');

describe('errorReducer unit tests.', () => {
  beforeEach(() => {
    // @ts-ignore
    isAppAction.mockClear();
    // @ts-ignore
    isAppAction.mockImplementation(() => true);
  });

  it('Throws if the previousState argument is not a boolean.', () => {
    const func = () => {
      // @ts-ignore
      errorReducer('foo');
    };

    expect(func).toThrow(strings.PREVIOUS_STATE_INVALID);
  });

  it('Defaults to false if the previousState argument does not exist.', () => {
    // @ts-ignore
    const val = errorReducer();
    expect(val).toBe(false);
  });
  
  it('Returns the previous state if the action argument does not meet the isAppAction type guard.', () => {
    expect(errorReducer(false, { value: true, } as IAppAction)).toBe(false);
  });

  it('Returns the previous state if the action argument\'s type prop is not AppActionTypes.Done.', () => {
    expect(errorReducer(true, { value: false, type: AppActionTypes.Rss, })).toBe(true);
  });

  it('Returns the previous state if the action argument\'s value prop is not a boolean.', () => {
    expect(errorReducer(true, { value: 'foobar', type: AppActionTypes.Error, })).toBe(true);
  });

  it('Returns the new value if the input was valid.', () => {
    expect(errorReducer(false, { value: true, type: AppActionTypes.Error, })).toBe(true);
  });
});