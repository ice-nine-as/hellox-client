import {
  isPageIdentifier,
} from '../../src/TypeGuards/isPageIdentifier';
import {
  PageIdentifiers,
} from '../../src/Enums/PageIdentifiers';

describe('isPageIdentifier unit tests.', () => {
  it('Rejects if the argument is not a value of PageIdentifiers.', () => {
    expect(isPageIdentifier(null)).toBe(false);
  });

  it('Passes if the argument is a member of PageIdentifiers.', () => {
    let failed = false;
    (Object as any).values(PageIdentifiers).forEach((language: PageIdentifiers) => {
      if (!isPageIdentifier(language)) {
        failed = true;
      }
    });

    expect(failed).toBe(false);
  });
});