import {
  AppActionTypes,
} from '../../../src/Enums/AppActionTypes';
import {
  strings,
  createLanguageAction,
} from '../../../src/Actions/Creators/createLanguageAction';
import {
  isAction,
} from '../../../src/TypeGuards/isAction';
import {
  isAppAction,
} from '../../../src/TypeGuards/isAppAction';
import {
  isLanguageAction,
} from '../../../src/TypeGuards/isLanguageAction';
import {
  LanguageAction,
} from '../../../src/Actions/App/LanguageAction';
import {
  Languages,
} from '../../../src/Enums/Languages';

describe('createLanguageAction unit tests.', () => {
  it('Has the correct type.', () => {
    expect(createLanguageAction(LanguageAction, Languages.English).type).toBe(AppActionTypes.Language);
  });

  it('Assigns the correct value.', () => {
    expect(createLanguageAction(LanguageAction, Languages.Norwegian).value).toBe(Languages.Norwegian);
  });

  it('Disallows changing of the type.', () => {
    const func = () => (<any>createLanguageAction(LanguageAction, Languages.English)).type = 'foo';
    expect(func).toThrow();
  });

  it('Disallows changing of the value.', () => {
    const func = () => (<any>createLanguageAction(LanguageAction, Languages.Russian)).value = 'foo';
    expect(func).toThrow();
  });

  it('Throws if the languageAction argument does not meet the isLanguageAction type guard.', () => {
    // @ts-ignore
    const func = () => createLanguageAction();
    expect(func).toThrow(strings.LANGUAGE_ACTION_INVALID);
  });

  it('Throws if the value argument does not meet the isLanguage type guard.', () => {
    // @ts-ignore
    const func = () => createLanguageAction(LanguageAction);
    expect(func).toThrow(strings.VALUE_INVALID);
  });
});

describe('DoneAppAction integration tests.', () => {
  it('Meets the isAction type guard.', () => {
    expect(isAction(createLanguageAction(LanguageAction, Languages.Russian))).toBe(true);
  });

  it('Meets the isAppAction type guard.', () => {
    expect(isAppAction(createLanguageAction(LanguageAction, Languages.Russian))).toBe(true);
  });

  it('Meets the isLanguageAction type guard.', () => {
    expect(isLanguageAction(createLanguageAction(LanguageAction, Languages.Russian))).toBe(true);
  });
});