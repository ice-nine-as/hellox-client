import {
  AppActionTypes,
} from '../../src/Enums/AppActionTypes';
import {
  loadingReducer,
  strings,
} from '../../src/Reducers/loadingReducer';
import {
  IAppAction,
} from '../../src/Actions/App/IAppAction';

/* Mocked */
import {
  isAppAction,
} from '../../src/TypeGuards/isAppAction';
jest.mock('../../src/TypeGuards/isAppAction');

describe('loadingReducer unit tests.', () => {
  beforeEach(() => {
    // @ts-ignore
    isAppAction.mockClear();
    // @ts-ignore
    isAppAction.mockImplementation(() => true);
  });

  it('Throws if the previousState argument is not a boolean.', () => {
    const func = () => {
      // @ts-ignore
      loadingReducer('foo');
    };

    expect(func).toThrow(strings.PREVIOUS_STATE_INVALID);
  });

  it('Defaults to false if the previousState argument does not exist.', () => {
    // @ts-ignore
    const val = loadingReducer();
    expect(val).toBe(false);
  });

  it('Returns the previous state if the action argument does not meet the isAppAction type guard.', () => {
    expect(loadingReducer(false, { value: true, } as IAppAction)).toBe(false);
  });

  it('Returns the previous state if the action argument\'s type prop is not AppActionTypes.Done.', () => {
    expect(loadingReducer(true, { value: false, type: AppActionTypes.Rss, })).toBe(true);
  });

  it('Returns the previous state if the action argument\'s value prop is not a boolean.', () => {
    expect(loadingReducer(true, { value: 'foobar', type: AppActionTypes.Loading, })).toBe(true);
  });

  it('Returns the new value if the input was valid.', () => {
    expect(loadingReducer(false, { value: true, type: AppActionTypes.Loading, })).toBe(true);
  });
});