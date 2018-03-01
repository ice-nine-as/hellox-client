import {
  PodcastLinkAction,
} from '../../../src/Actions/Link/PodcastLinkAction';
import {
  isAction,
} from '../../../src/TypeGuards/isAction';
import {
  isLinkAction,
} from '../../../src/TypeGuards/isLinkAction';
import {
  PageIdentifiers,
} from '../../../src/Enums/PageIdentifiers';

describe('PodcastLinkAction unit tests.', () => {
  it('Has the correct type.', () => {
    expect(PodcastLinkAction.type).toBe(PageIdentifiers.Podcast);
  });

  it('Defaults to a value of null.', () => {
    expect(PodcastLinkAction.value).toBe(null);
  });

  it('Disallows changing of the type.', () => {
    const func = () => (<any>PodcastLinkAction.type) = 'foo';
    expect(func).toThrow();
  });

  it('Disallows changing of the value.', () => {
    const func = () => (<any>PodcastLinkAction.value) = 'foo';
    expect(func).toThrow();
  });
});

describe('PodcastLinkAction integration tests.', () => {
  it('Meets the isAction type guard.', () => {
    expect(isAction(PodcastLinkAction)).toBe(true);
  });

  it('Meets the isLinkAction type guard.', () => {
    expect(isLinkAction(PodcastLinkAction)).toBe(true);
  });
})