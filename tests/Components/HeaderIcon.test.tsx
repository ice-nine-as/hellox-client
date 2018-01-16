import {
  create as createDeepRenderer,
} from 'react-test-renderer';

import {
  createRenderer as createShallowRenderer,
} from 'react-test-renderer/shallow';

import {
  HeaderIcon,
} from '../../src/Components/HeaderIcon';

import * as React from 'react';

type Mock = jest.Mock;

describe('HeaderIcon component unit tests.', () => {
  it('Renders shallowly.', () => {
    const renderer = createShallowRenderer();
    const func = () => renderer.render(<HeaderIcon url="foo" />);
    expect(func).not.toThrow();
  });

  it('Needs url prop.', () => {
    const renderer = createShallowRenderer();
    renderer.render(<HeaderIcon url="bar" />);
    const component = renderer.getRenderOutput();
    const product = typeof component === 'object' &&
      Boolean(component) &&
      typeof component.props === 'object' &&
      Boolean(component.props) &&
      Object.keys(component.props).filter((key) => {
        return !/children|className/.test(key);
      }).length === 1;

    expect(product).toBe(true);
  });
});

describe('HeaderIcon component integration tests.', () => {
  it('Renders deeply.', () => {
    const func = () => {
      const renderer = createDeepRenderer(<HeaderIcon url="bux" />);
      return renderer.toJSON();
    };

    expect(func).not.toThrow();
  });

  it('Renders an img JSX.Element with className and src props.', () => {
    const renderer = createDeepRenderer(<HeaderIcon url="baz" />);
    const component = renderer.toTree();
    expect(component.rendered.type).toBe('img');
    expect(component.rendered.props.src).toBe('baz');
  });
});