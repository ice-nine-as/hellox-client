import {
  getDefaultNavLinks,
} from '../../src/Modules/getDefaultNavLinks';

jest.mock('../../src/Modules/makeLinkAction');
import {
  makeLinkAction,
} from '../../src/Modules/makeLinkAction';

import * as React from 'react';

type Mock = jest.Mock;

describe('getDefaultNavLinks unit tests.', () => {
  beforeEach(() => {
    (makeLinkAction as Mock).mockClear();
  });

  it('Calls makeLinkAction for each created element.', () => {
    const navLinks = getDefaultNavLinks();
    console.log(navLinks.length);
    expect((makeLinkAction as Mock).mock.calls.length).toBe(navLinks.length);
  });

  it('Cannot be added to.', () => {
    const navLinks = getDefaultNavLinks();
    const func1 = () => (navLinks as Array<any>).push('foo');
    const func2 = () => (navLinks as Array<any>).unshift('foo');
    expect(func1).toThrow();
    expect(func2).toThrow();
  });

  it('Cannot be removed from.', () => {
    const navLinks = getDefaultNavLinks();
    const func1 = () => (navLinks as Array<any>).pop();
    const func2 = () => (navLinks as Array<any>).shift();
    expect(func1).toThrow();
    expect(func2).toThrow();
  });

  it('Cannot be mutated.', () => {
    const navLinks = getDefaultNavLinks();
    navLinks.forEach((link, ii) => {
      const func = () => (navLinks as any)[ii] = 'fuzz';
      expect(func).toThrow();
    });
  });

  it('Returns an array of JSX.Elements.', () => {
    const navLinks = getDefaultNavLinks();
    expect(navLinks.filter((aa) => 'props' in aa).length).toBe(navLinks.length);
  });

  it('Has only JSX.Elements with key attributes, none of which are identical.', () => {
    const navLinks = getDefaultNavLinks();
    const seen = [];
    expect(navLinks.filter((aa) => {
      const isSeen = seen.indexOf(aa.key) !== -1;
      seen.push(aa.key);
      return !isSeen;
    }).length).toBe(navLinks.length);
  });
});