import {
  configureClientStore,
} from './Modules/configureClientStore';
import {
  createBrowserHistory,
} from 'history';
import {
  hydrate,
} from 'react-dom';
import {
  ComponentClass,
} from 'react';
import {
  Store,
} from 'redux';
import {
  TAppProps,
} from './TypeAliases/TAppProps';

import * as React from 'react';

// @ts-ignore
import styles from './Styles/Components/App';

const history = createBrowserHistory();
const { store, } = configureClientStore(
  history,
  // @ts-ignore
  window.REDUX_STATE);

const render = (Component: ComponentClass<{ store: Store<TAppProps> }>) => {
  return hydrate(<Component store={store} />,
    // @ts-ignore
    document.querySelector('#root'));
};

render(require('./Components/ProviderContainer').ProviderContainer);

// @ts-ignore
if (process.env.NODE_ENV === 'development' && module.hot) {
  // @ts-ignore
  module.hot.accept('./Components/ProviderContainer', () => {
    render(require('./Components/ProviderContainer').ProviderContainer);
  });
}