import {
  ConnectedApp,
} from './Components/App';
import {
  configureClientStore,
} from './Modules/configureClientStore';
import {
  createBrowserHistory,
} from 'history';
import {
  hydrate,
} from 'react-dom';

import * as React from 'react';

/* Registers service worker. */
import { install, } from 'offline-plugin/runtime';
if (process.env.NODE_ENV === 'production') {
  install();
}

export const render = (component: JSX.Element) => {
  return hydrate(component,
    // @ts-ignore
    document.querySelector('#root'));
};

export const init = () => {
  const history = createBrowserHistory();
  const { store, } = configureClientStore(
    history,
    // @ts-ignore
    window.REDUX_STATE);

  const ProviderContainer = require('./Components/ProviderContainer')
    .ProviderContainer;
  render(<ProviderContainer store={store}>
          <ConnectedApp />
        </ProviderContainer>);

  /* istanbul ignore next */
  // @ts-ignore
  if (process.env.NODE_ENV === 'development' && module.hot) {
    // @ts-ignore
    module.hot.accept('./Components/ProviderContainer', () => {
      const ProviderContainer = require('./Components/ProviderContainer')
        .ProviderContainer;

      render(<ProviderContainer store={store}>
              <ConnectedApp />
            </ProviderContainer>);
    });
  }
}

if (process.env.NODE_ENV !== 'test') {
  init();
}

export default init;