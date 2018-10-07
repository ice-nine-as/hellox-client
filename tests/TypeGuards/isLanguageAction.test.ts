import {
  AppActionTypes,
} from '../../src/Enums/AppActionTypes';
import {
  isLanguageAction,
} from '../../src/TypeGuards/isLanguageAction';

import {
  isAppAction,
} from '../../src/TypeGuards/isAppAction';
jest.mock('../../src/TypeGuards/isAppAction');
import {
  isLanguage,
} from '../../src/TypeGuards/isLanguage';
jest.mock('../../src/TypeGuards/isLanguage');

describe('isLanguageAction unit tests.', () => {
  it('Rejects if the argument does not meet the isAppAction type guard.', () => {
    (isAppAction as any).mockImplementationOnce(() => false);
    expect(isLanguageAction({})).toBe(false);
  });

  it('Rejects if the argument\'s type property is not AppActionTypes.Language.', () => {
    (isAppAction as any).mockImplementationOnce(() => true);
    expect(isLanguageAction({})).toBe(false);
  });

  it('Rejects if the argument\'s value property does not meet the isLanguage type guard.', () => {
    (isAppAction as any).mockImplementationOnce(() => true);
    (isLanguage as any).mockImplementationOnce(() => false);
    expect(isLanguageAction({ type: AppActionTypes.Language ,})).toBe(false);
  });

  it('Passes if the argument is an object with a type string and a value property.', () => {
    (isAppAction as any).mockImplementationOnce(() => true);
    (isLanguage as any).mockImplementationOnce(() => true);
    expect(isLanguageAction({ type: AppActionTypes.Language ,})).toBe(true);
  });
});