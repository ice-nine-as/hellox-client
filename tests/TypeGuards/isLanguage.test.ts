import {
  Languages,
} from '../../src/Enums/Languages';
import {
  isLanguage,
} from '../../src/TypeGuards/isLanguage';

describe('isLanguage unit tests.', () => {
  it('Rejects if the argument is not a value of Languages.', () => {
    expect(isLanguage(null)).toBe(false);
  });

  it('Passes if the argument is a member of Languages.', () => {
    let failed = false;
    (Object as any).values(Languages).forEach((language: Languages) => {
      if (!isLanguage(language)) {
        failed = true;
      }
    });

    expect(failed).toBe(false);
  });
});