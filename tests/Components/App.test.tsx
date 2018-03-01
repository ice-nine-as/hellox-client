import * as React from 'react';
(React as any).PureComponent = jest.fn();

jest.mock('react-redux');
import {
  connect,
} from 'react-redux';

jest.mock('redux-first-router-link');
jest.mock('../../src/Modules/getDefaultNavLinks');

jest.mock('../../src/TypeGuards/isPageIdentifier');
import {
  isPageIdentifier,
} from '../../src/TypeGuards/isPageIdentifier';

jest.mock('../../src/Components/Universal');
import {
  Universal,
} from '../../src/Components/Universal';

import {
  App,
} from '../../src/Components/App';

import {
  createRenderer,
} from 'react-test-renderer/shallow';

type Mock = jest.Mock;

describe('AppConstructor unit tests.', () => {
  beforeEach(() => {
    (React as any).PureComponent.mockClear();
  });

  it('Passes the provided props to the React.PureComponent constructor.', () => {
    const props = {
      test1: 'one',
      test2: 'two',
      test6: 'six',
    } as any;

    const renderer = createRenderer();
    renderer.render(<App {...props} />);

    expect((React as any).PureComponent.mock.calls).toEqual([
      props,
    ]);
  });
});