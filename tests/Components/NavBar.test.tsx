import {
  create as createDeepRenderer,
} from 'react-test-renderer';

import {
  createRenderer as createShallowRenderer,
} from 'react-test-renderer/shallow';

import {
  NavBar,
} from '../../src/Components/NavBar';

import * as React from 'react';

type Mock = jest.Mock;

describe('NavBar component unit tests.', () => {
  it('Renders shallowly.', () => {
    const renderer = createShallowRenderer();
    const func = () => renderer.render(<NavBar />);
    expect(func).not.toThrow();
  });

  it('Needs no props.', () => {
    const renderer = createShallowRenderer();
    renderer.render(<NavBar />);
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

describe('HeaderIcon component integration tests.', () => {
  it('Renders deeply.', () => {
    const func = () => {
      const renderer = createDeepRenderer(<NavBar />);
      return renderer.toJSON();
    };

    expect(func).not.toThrow();
  });

  it('Renders empty strings for falsy children.', () => {
    const renderer = createDeepRenderer(
      <NavBar>
        {null}
        {false}
        {undefined}
        {0}
        {''}
      </NavBar>
    );

    const component = renderer.toTree();
    expect(component.rendered.props.children).toEqual([]);
  });

  it('Gets the rendered className from the child, or an empty string, and appends the NavBarItem style.', () => {
    const renderer = createDeepRenderer(
      <NavBar>
        <div>foo</div>
        <p className="bar"></p>
      </NavBar>
    );

    const component = renderer.toTree();
    expect(component.rendered.rendered).toMatchObject([
      {
        type: 'div',
        props: {
          children:  
          'foo',
          className: 'undefined',
        },
      },
      {
        type: 'p',
        props: {
          className: 'bar undefined',
        },
      }
    ]);
  });

  it('Wraps plain strings and numbers into spans.', () => {
    const renderer = createDeepRenderer(
      <NavBar>
        {'1'}
        {2}
      </NavBar>
    );

    const component = renderer.toTree();
    expect(component.rendered.props.children).toMatchObject([
      {
        type: 'span',
        props: {
          children: '1',
        },
      },

      {
        type: 'span',
        props: {
          children: 2,
        },
      },
    ]);
  });

  it('Clones the computed className property into any JSX.Element objects passed as children.', () => {
    const renderer = createDeepRenderer(
      <NavBar>
        <a id="foo" />
        <a id="bar" />
      </NavBar>
    );

    const component = renderer.toTree();
    expect(component.rendered.props.children).toMatchObject([
      {
        type: 'a',
        props: {
          id: 'foo',
          className: 'undefined',
        },
      },

      {
        type: 'a',
        props: {
          id: 'bar',
          className: 'undefined',
        },
      },
    ]);
  });
});