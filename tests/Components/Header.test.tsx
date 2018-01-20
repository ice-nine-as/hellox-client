jest.mock('../../src/Modules/getDefaultNavLinks');
import {
  getDefaultNavLinks,
} from '../../src/Modules/getDefaultNavLinks';

jest.mock('../../src/Components/NavBar');
import {
  NavBar,
} from '../../src/Components/NavBar';

import {
  create as createDeepRenderer,
} from 'react-test-renderer';

import {
  createRenderer as createShallowRenderer,
} from 'react-test-renderer/shallow';

import {
  Header,
} from '../../src/Components/Header';

import * as React from 'react';

type Mock = jest.Mock;

describe('Header component unit tests.', () => {
  it('Renders shallowly.', () => {
    const renderer = createShallowRenderer();
    const func = () => renderer.render(<Header />);
    expect(func).not.toThrow();
  });

  it('Needs no props.', () => {
    const renderer = createShallowRenderer();
    renderer.render(<Header />);
    const component = renderer.getRenderOutput();
    const product = typeof component === 'object' &&
      Boolean(component) &&
      typeof component.props === 'object' &&
      Boolean(component.props) &&
      Object.keys(component.props).filter((key) => {
        return !/children|className/.test(key);
      }).length === 0;

    expect(product).toBe(true);
  });
});

describe('Header component integration tests.', () => {
  const sym1 = Symbol(1);
  const sym2 = Symbol(2);

  beforeEach(() => {
    (getDefaultNavLinks as Mock).mockClear();
    (getDefaultNavLinks as Mock).mockImplementation(() => [ sym1, sym2, ]);
  });

  it('Renders deeply.', () => {
    const func = () => {
      const renderer = createDeepRenderer(<Header />);
      return renderer.toJSON();
    };

    expect(func).not.toThrow();
  });

  it('Renders a NavBar child.', () => {
    const renderer = createDeepRenderer(<Header />);
    const component = renderer.toTree();

    expect(component.rendered.props.children).toMatchObject({
      type: NavBar,
    });
  });

  it('Calls getDefaultNavLinks and embeds the product of that in the NavBar child.', () => {
    const renderer  = createDeepRenderer(<Header />);
    const component = renderer.toTree();
    expect((getDefaultNavLinks as Mock).mock.calls.length).toBe(1);
    expect(component.rendered.props.children).toMatchObject({
      props: {
        children: [
          sym1,
          sym2,
        ],
      },
    });
  });
});