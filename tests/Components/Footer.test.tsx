import {
  create as createDeepRenderer,
} from 'react-test-renderer';

import {
  createRenderer as createShallowRenderer,
} from 'react-test-renderer/shallow';

import {
  Footer,
} from '../../src/Components/Footer';

import * as React from 'react';

type Mock = jest.Mock;

describe('Footer component unit tests.', () => {
  it('Renders shallowly.', () => {
    const renderer = createShallowRenderer();
    const func = () => renderer.render(<Footer />);
    expect(func).not.toThrow();
  });

  it('Needs no props.', () => {
    const renderer = createShallowRenderer();
    renderer.render(<Footer />);
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

describe('Footer component integration tests.', () => {
  it('Renders deeply.', () => {
    const func = () => {
      const renderer = createDeepRenderer(<Footer />);
      return renderer.toJSON();
    };

    expect(func).not.toThrow();
  });

  it('Renders all string/number children.', () => {
    const renderer = createDeepRenderer(<Footer />);
    const component = renderer.toTree();
    const allAreStringOrNumber = component.rendered.props.children.filter((aa) => {
      return /string|number/.test(typeof aa);
    });

    expect(allAreStringOrNumber.length).toBe(component.rendered.props.children.length);
  });
});