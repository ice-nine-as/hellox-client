import {
  LanguageAction,
} from '../../src/Actions/App/LanguageAction';
import {
  isAction,
} from '../../src/TypeGuards/isAction';

describe('isAction unit tests.', () => {
  it('Rejects if the argument is not of type object.', () => {
    expect(isAction(false)).toBe(false);
  });

  it('Rejects if the argument is null.', () => {
    expect(isAction(null)).toBe(false);
  });

  it('Rejects if the argument has no type property.', () => {
    expect(isAction({})).toBe(false);
  });

  it('Rejects if the type property of the argument is not of type string.', () => {
    expect(isAction({ type: 2, value: null, })).toBe(false);
  });

  it('Rejects if the type property of the argument is an empty string.', () => {
    expect(isAction({ type: '', value: null, })).toBe(false);
  });

  it('Rejects if the argument has no value property.', () => {
    expect(isAction({ type: 'foo', })).toBe(false);
  });

  it('Passes if the argument is an object with a type string and a value property.', () => {
    expect(isAction({ type: 'foo', value: 2, })).toBe(true);
  });
});

describe('isAction integration tests.', () => {
  it('Passes for a simple action.', () => {
    expect(isAction(LanguageAction)).toBe(true);
  });
});