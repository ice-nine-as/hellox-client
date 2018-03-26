import {
  AppActionTypes,
} from '../../../src/Enums/AppActionTypes';
import {
  isAction,
} from '../../../src/TypeGuards/isAction';
import {
  isLanguageAction,
} from '../../../src/TypeGuards/isLanguageAction';
import {
  LanguageAction,
} from '../../../src/Actions/App/LanguageAction';
import {
  Languages,
} from '../../../src/Enums/Languages';

describe('LanguageAction unit tests.', () => {
  it('Has the correct type.', () => {
    expect(LanguageAction.type).toBe(AppActionTypes.Language);
  });

  it('Defaults to a value of false.', () => {
    expect(LanguageAction.value).toBe(Languages.English);
  });

  it('Disallows changing of the type.', () => {
    const func = () => (<any>LanguageAction.type) = 'foo';
    expect(func).toThrow();
  });

  it('Disallows changing of the value.', () => {
    const func = () => (<any>LanguageAction.value) = 'foo';
    expect(func).toThrow();
  });
});

describe('LoadingAppAction unit tests.', () => {
  it('Meets the isAction type guard.', () => {
    expect(isAction(LanguageAction)).toBe(true);
  });

  it('Meets the isAppAction type guard.', () => {
    expect(isLanguageAction(LanguageAction)).toBe(true);
  });
});