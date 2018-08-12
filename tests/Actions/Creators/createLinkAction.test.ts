import {
  AboutLinkAction,
} from '../../../src/Actions/Link/AboutLinkAction';
import {
  AppActionTypes,
} from '../../../src/Enums/AppActionTypes';
import {
  strings,
  createLinkAction,
} from '../../../src/Actions/Creators/createLinkAction';
import {
  isAction,
} from '../../../src/TypeGuards/isAction';
import {
  isAppAction,
} from '../../../src/TypeGuards/isAppAction';
import {
  isLinkAction,
} from '../../../src/TypeGuards/isLinkAction';
import {
  PageIdentifiers,
} from '../../../src/Enums/PageIdentifiers.js';

describe('createLinkAction unit tests.', () => {
  it('Has the correct type.', () => {
    expect(createLinkAction(AboutLinkAction, {}).type).toBe(PageIdentifiers.About);
  });

  it('Assigns the correct value.', () => {
    expect(createLinkAction(AboutLinkAction).value).toBe(null);
  });

  it('Assigns the correct payload.', () => {
    const payload = {};
    expect(createLinkAction(AboutLinkAction, payload).payload).toBe(payload);
  });

  it('Disallows changing of the type.', () => {
    const func = () => (<any>createLinkAction(AboutLinkAction, {})).type = 'foo';
    expect(func).toThrow();
  });

  it('Disallows changing of the value.', () => {
    const func = () => (<any>createLinkAction(AboutLinkAction, {})).value = 'foo';
    expect(func).toThrow();
  });

  it('Throws if the AboutLinkAction argument does not meet the isLinkAction type guard.', () => {
    // @ts-ignore
    const func = () => createLinkAction();
    expect(func).toThrow(strings.LINK_ACTION_INVALID);
  });

  it('Throws if the payload argument is not an object.', () => {
    // @ts-ignore
    const func = () => createLinkAction(AboutLinkAction, null);
    expect(func).toThrow(strings.PAYLOAD_INVALID);
  });
});

describe('createLinkAction integration tests.', () => {
  it('Meets the isAction type guard.', () => {
    expect(isAction(createLinkAction(AboutLinkAction, {}))).toBe(true);
  });

  it('Meets the isLinkAction type guard.', () => {
    expect(isLinkAction(createLinkAction(AboutLinkAction, {}))).toBe(true);
  });
});