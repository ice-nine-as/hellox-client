import {
  FeedKeys,
} from '../../src/Enums/FeedKeys';
import {
  isFeedKey,
} from '../../src/TypeGuards/isFeedKey';

describe('isFeedKey unit tests.', () => {
  it('Rejects if the argument is not a value of FeedKeys.', () => {
    expect(isFeedKey(null)).toBe(false);
  });

  it('Passes if the argument is a member of FeedKeys.', () => {
    let failed = false;
    (Object as any).values(FeedKeys).forEach((feedKey: FeedKeys) => {
      if (!isFeedKey(feedKey)) {
        failed = true;
      }
    });

    expect(failed).toBe(false);
  });
});