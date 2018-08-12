import {
  AppActionTypes,
} from '../../src/Enums/AppActionTypes';
import {
  languageReducer,
  strings,
} from '../../src/Reducers/languageReducer';
import {
  ILanguageAction,
} from '../../src/Actions/App/ILanguageAction';
import {
  Languages,
} from '../../src/Enums/Languages';

/* Mocked */
import {
  isLanguage,
} from '../../src/TypeGuards/isLanguage';
jest.mock('../../src/TypeGuards/isLanguage');

import {
  isLanguageAction,
} from '../../src/TypeGuards/isLanguageAction';
jest.mock('../../src/TypeGuards/isLanguageAction');

type Mock = jest.Mock;

describe('languageReducer unit tests.', () => {
  beforeEach(() => {
    // @ts-ignore
    isLanguage.mockClear();
    // @ts-ignore
    isLanguage.mockImplementation(() => true);
    
    // @ts-ignore
    isLanguageAction.mockClear();
    // @ts-ignore
    isLanguageAction.mockImplementation(() => true);
  });

  it('Throws if the previousState argument is does not meet the isLanguage type guard.', () => {
    // @ts-ignore
    isLanguage.mockImplementationOnce(() => false);

    const func = () => {
      // @ts-ignore
      languageReducer('foo');
    };

    expect(func).toThrow(strings.PREVIOUS_STATE_INVALID);
  });

  it('Defaults to Langauges.English if the previousState argument does not exist.', () => {
    // @ts-ignore
    const val = languageReducer();
    expect(val).toBe(Languages.English);
  });
  
  it('Returns the previous state if the action argument does not meet the isLanguageAction type guard.', () => {
    // @ts-ignore
    isLanguageAction.mockImplementationOnce(() => false);

    const val = languageReducer(
      Languages.English,
      // @ts-ignore
      {});

    expect(val).toBe(Languages.English);
  });

  it('Returns the new value if the input was valid.', () => {
    const val = languageReducer(Languages.English, { value: Languages.Norwegian, type: AppActionTypes.Language, });
    expect(val).toBe(Languages.Norwegian);
  });
});