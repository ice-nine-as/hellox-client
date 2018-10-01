import {
  AppActionTypes,
} from '../../src/Enums/AppActionTypes';
import {
  hamburgerOpenReducer,
  strings,
} from '../../src/Reducers/hamburgerOpenReducer';
import {
  IAppAction,
} from '../../src/Actions/App/IAppAction';

/* Mocked */
import {
  isAppAction,
} from '../../src/TypeGuards/isAppAction';
jest.mock('../../src/TypeGuards/isAppAction');

describe('hamburgerOpenReducer unit tests.', () => {
  beforeEach(() => {
    // @ts-ignore
    isAppAction.mockClear();
    // @ts-ignore
    isAppAction.mockImplementation(() => true);
  });

  it('Throws if the previousState argument is not a boolean.', () => {
    const func = () => {
      // @ts-ignore
      hamburgerOpenReducer('foo');
    };

    expect(func).toThrow(strings.PREVIOUS_STATE_INVALID);
  });

  it('Defaults to false if the previousState argument does not exist.', () => {
    // @ts-ignore
    const val = hamburgerOpenReducer();
    expect(val).toBe(false);
  });
  
  it('Returns the previous state if the action argument does not meet the isAppAction type guard.', () => {
    expect(hamburgerOpenReducer(false, { value: true, } as IAppAction)).toBe(false);
  });

  it('Returns the previous state if the action argument\'s type prop is not AppActionTypes.Done.', () => {
    expect(hamburgerOpenReducer(true, { value: false, type: AppActionTypes.Rss, })).toBe(true);
  });

  it('Returns the previous state if the action argument\'s value prop is not a boolean.', () => {
    expect(hamburgerOpenReducer(true, { value: 'foobar', type: AppActionTypes.HamburgerOpen, })).toBe(true);
  });

  it('Returns the new value if the input was valid.', () => {
    expect(hamburgerOpenReducer(false, { value: true, type: AppActionTypes.HamburgerOpen, })).toBe(true);
  });
});