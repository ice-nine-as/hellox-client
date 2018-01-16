import {
  create as createDeepRenderer,
} from 'react-test-renderer';
import {
  createRenderer as createShallowRenderer,
} from 'react-test-renderer/shallow';
import {
  default as AppContainer,
} from 'react-hot-loader/lib/AppContainer';

jest.mock('react-redux');
import {
  Provider,
} from 'react-redux';

import * as React from 'react';
import { Store } from 'redux';
import { TAppProps } from '../../src/TypeAliases/TAppProps';

import {
  ProviderContainer,
} from '../../src/Components/ProviderContainer';

type Mock = jest.Mock;

describe('NavBar component unit tests.', () => {
  it('Renders shallowly.', () => {
    const renderer = createShallowRenderer();
    const func = () => renderer.render(<ProviderContainer store={{} as Store<TAppProps>} />);
    expect(func).not.toThrow();
  });

  it('Needs store prop.', () => {
    const renderer = createShallowRenderer();
    renderer.render(<ProviderContainer store={{ loading: false, dispatch: jest.fn(), } as any} />);
    const component = renderer.getRenderOutput();
    const product = typeof component === 'object' &&
      Boolean(component) &&
      typeof component.props === 'object' &&
      Boolean(component.props);

    expect(product).toBe(true);
  });
});

describe('ProviderContainer component integration tests.', () => {
  it('Renders deeply.', () => {
    const func = () => {
      const renderer = createDeepRenderer(<ProviderContainer store={{} as Store<TAppProps>} />);
      return renderer.toJSON();
    };

    expect(func).not.toThrow();
  });

  it('Renders Provider -> AppContainer -> props.children.', () => {
    const renderer = createDeepRenderer(<ProviderContainer store={{} as Store<TAppProps>} />);

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