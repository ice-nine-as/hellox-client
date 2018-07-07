import {
  configureClientStore,
} from '../../src/Functions/configureClientStore';

/* Mocked */
import {
  getReducers,
} from '../../src/Functions/getReducers';
jest.mock('../../src/Functions/getReducers');

import {
  getRoutesMap,
} from '../../src/Functions/getRoutesMap';
jest.mock('../../src/Functions/getRoutesMap');

import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  StoreEnhancerStoreCreator,
} from 'redux';
jest.mock('redux');

import {
  connectRoutes,
  RoutesMap,
} from 'redux-first-router';
jest.mock('redux-first-router');

import thunkMiddleware from 'redux-thunk';
jest.mock('redux-thunk');

type Mock = jest.Mock;

describe('configureClientStore unit tests.', () => {
  beforeEach(() => {
    (<Mock>connectRoutes).mockClear();
    (<Mock>connectRoutes).mockImplementation(() => ({}));

    (<Mock>combineReducers).mockClear();
    (<Mock>getReducers).mockClear();
    (<Mock>applyMiddleware).mockClear();
    (<Mock>compose).mockClear();
    (<Mock>createStore).mockClear();
  });

  it('Passes the history and routesMap arguments to connectRoutes.', () => {
    const testOne   = Symbol('test1');
    const testTwo   = Symbol('test2');
    const testThree = Symbol('test3');
    (<Mock>configureClientStore)(testOne, testTwo, testThree);
    expect((<Mock>connectRoutes).mock.calls).toEqual([
      [
        testOne,
        testThree,
      ],
    ]);
  });

  it('Calls getDefaultReducers with no arguments.', () => {
    (<Mock>configureClientStore)();
    expect((<Mock>getReducers).mock.calls).toEqual([ [], ]);
  });

  it('Passes the products of getDefaultReducer and the location reducer produced by connectRoutes to combineReducers.', () => {
    const locMock = jest.fn();
    (<Mock>connectRoutes).mockImplementation(() => ({
      reducer: locMock,
    }));
    
    const symOne   = Symbol('arrSym1');
    const symTwo   = Symbol('arrSym2');
    const symThree = Symbol('arrSym3');
    (<Mock>getReducers).mockImplementation(() => ({
      done:    symOne,
      error:   symTwo,
      loading: symThree,
    }));
    
    (<Mock>configureClientStore)();
    expect((<Mock>combineReducers).mock.calls).toEqual([
      [
        {
          done: symOne,
          error: symTwo,
          loading: symThree,
          location: locMock,
        },
      ],
    ]);
  });

  it('Passes both the thunk middleware and the connectRoutes middleware to applyMiddleware.', () => {
    const testMiddleware = Symbol('testMiddleware');
    (<Mock>connectRoutes).mockImplementation(() => ({
      middleware: testMiddleware,
    }));

    (<Mock>configureClientStore)();
    expect((<Mock>applyMiddleware).mock.calls).toEqual([
      [
        thunkMiddleware,
        testMiddleware,
      ],
    ]);
  });

  it('Passes both the connectRoutes enhancer and the middleware collection produced by applyMiddleware to compose.', () => {
    const testEnhancer = Symbol('testEnhancer');
    (<Mock>connectRoutes).mockImplementation(() => ({
      enhancer: testEnhancer,
    }));
    
    const testMiddlewares = Symbol('testMiddlewares');
    (<Mock>applyMiddleware).mockImplementation(() => testMiddlewares);

    (<Mock>configureClientStore)();
    expect((<Mock>compose).mock.calls).toEqual([
      [
        testEnhancer,
        testMiddlewares,
      ],
    ]);
  });

  it('Passes the combineReducers rootReducer, the preloadedState argument, and the compose enhancers to createStore.', () => {
    const testReducer = Symbol('testReducer');
    (<Mock>combineReducers).mockImplementation(() => testReducer);
    
    const testCompose = Symbol('testCompose');
    (<Mock>compose).mockImplementation(() => testCompose);

    const testOne = Symbol('test1');
    (<Mock>configureClientStore)(null, testOne, null);
    expect((<Mock>createStore).mock.calls).toEqual([
      [
        testReducer,
        testOne,
        testCompose,
      ],
    ]);
  });

  it('Returns the createStore store and the connectRoutes thunk in an object.', () => {
    const testThunk = Symbol('testThunk');
    (<Mock>connectRoutes).mockImplementation(() => ({
      thunk: testThunk,
    }));
    
    const testStore = Symbol('testStore');
    (<Mock>createStore).mockImplementation(() => testStore);

    expect((<Mock>configureClientStore)()).toEqual({
      store: testStore,
      thunk: testThunk,
    });
  });
});