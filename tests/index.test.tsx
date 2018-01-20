jest.mock('../src/Modules/configureClientStore');
import {
  configureClientStore,
} from '../src/Modules/configureClientStore';
(configureClientStore as Mock).mockImplementation(() => ({ store: {}, }));

jest.mock('history');
import {
  createBrowserHistory,
} from 'history';

import {
  ProviderContainer,
} from '../src/Components/ProviderContainer';

jest.mock('react-dom');
import {
  hydrate,
} from 'react-dom';

import {
  init,
  render,
} from '../src/';

import * as React from 'react';
import { Store } from 'react-redux';
import { TAppProps } from '../src/TypeAliases/TAppProps';

type Mock = jest.Mock;

describe('init unit tests.', () => {
  beforeEach(() => {
    (configureClientStore as Mock).mockClear();
    (configureClientStore as Mock).mockImplementation(() => ({ store: {}, }));

    (createBrowserHistory as Mock).mockClear();
    (hydrate as Mock).mockClear();
  });

  it('Creates a browser history.', () => {
    init();
    expect((createBrowserHistory as Mock).mock.calls.length).toBe(1);
  });

  it('Configures a client store.', () => {
    const sym1 = Symbol(1);
    (createBrowserHistory as Mock).mockImplementation(() => sym1);

    const sym2 = Symbol(2);
    (window as any).REDUX_STATE = sym2;
    init();
    expect((configureClientStore as Mock).mock.calls).toEqual([
      [
        sym1,
        sym2,
      ],
    ]);
  });
});

describe('render unit tests.', () => {
  beforeEach(() => {
    (hydrate as Mock).mockClear();
  });

  it('Calls hydrate, passing the component argument and attaching the store argument as a prop, as well as the #root element queried from the document.', () => {
    const selector = document.querySelector;
    const rootSym = Symbol('#root');
    const mockSelector = jest.fn(() => rootSym);
    document.querySelector = mockSelector;
    
    render(<ProviderContainer store={{} as Store<TAppProps>} />);
    expect((hydrate as Mock).mock.calls).toEqual([
      [
        <ProviderContainer store={{} as any} />,
        rootSym,
      ],
    ]);

    document.querySelector = selector;
  });

  it('Returns the product of the hydrate call.', () => {
    const hydrateSym = Symbol('hydrate');
    (hydrate as Mock).mockImplementation(() => hydrateSym);

    expect(render(<ProviderContainer store={{} as Store<TAppProps>} />))
      .toEqual(hydrateSym);
  });
});