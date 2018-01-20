jest.mock('../../src/Actions/Link/AboutLinkAction');
import {
  AboutLinkAction,
} from '../../src/Actions/Link/AboutLinkAction';

jest.mock('../../src/TypeGuards/isLinkAction')
import {
  isLinkAction,
} from '../../src/TypeGuards/isLinkAction';

import {
  makeLinkAction,
  strings,
} from '../../src/Modules/makeLinkAction';

import {
  PageIdentifiers,
} from '../../src/Enums/PageIdentifiers';

type Mock = jest.Mock;

describe('makeLinkAction unit tests.', () => {
  beforeEach(() => {
    (isLinkAction as any).mockImplementation(() => true);
    (isLinkAction as any).mockClear();
  });

  it('Throws if the provided linkAction argument does not meet the isLinkAction type guard.', () => {
    (isLinkAction as any).mockImplementation(() => false);
    const func = () => (makeLinkAction as Function)();
    expect(func).toThrow(strings.LINK_ACTION_INVALID);
  });

  it('Throws if the payload is not an object type.', () => {
    const func = () => (makeLinkAction as Function)(null, 'foo');
    expect(func).toThrow(strings.PAYLOAD_INVALID);
  });

  it('Throws if the payload is not an object.', () => {
    const func = () => (makeLinkAction as Function)(null, null);
    expect(func).toThrow(strings.PAYLOAD_INVALID);
  });

  it('Returns the linkAction with the payload argument attached.', () => {
    const payload = { foo: 'baz', bar: 'bux', }
    expect(makeLinkAction(AboutLinkAction, payload)).toEqual({
      type: PageIdentifiers.About,
      value: null,
      payload: {
        bar: 'bux',
        foo: 'baz',
      },
    });
  });
});