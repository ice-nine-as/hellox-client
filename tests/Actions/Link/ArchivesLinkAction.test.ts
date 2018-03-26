import {
  ArchivesLinkAction,
} from '../../../src/Actions/Link/ArchivesLinkAction';
import {
  isAction,
} from '../../../src/TypeGuards/isAction';
import {
  isLinkAction,
} from '../../../src/TypeGuards/isLinkAction';
import {
  PageIdentifiers,
} from '../../../src/Enums/PageIdentifiers';

describe('ArchivesLinkAction unit tests.', () => {
  it('Has the correct type.', () => {
    expect(ArchivesLinkAction.type).toBe(PageIdentifiers.Archives);
  });

  it('Defaults to a value of null.', () => {
    expect(ArchivesLinkAction.value).toBe(null);
  });

  it('Disallows changing of the type.', () => {
    const func = () => (<any>ArchivesLinkAction.type) = 'foo';
    expect(func).toThrow();
  });

  it('Disallows changing of the value.', () => {
    const func = () => (<any>ArchivesLinkAction.value) = 'foo';
    expect(func).toThrow();
  });
});

describe('ArchivesLinkAction integration tests.', () => {
  it('Meets the isAction type guard.', () => {
    expect(isAction(ArchivesLinkAction)).toBe(true);
  });

  it('Meets the isLinkAction type guard.', () => {
    expect(isLinkAction(ArchivesLinkAction)).toBe(true);
  });
});