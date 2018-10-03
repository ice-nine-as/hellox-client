import {
  hot,
} from 'react-hot-loader';
import {
  Provider,
} from 'react-redux';
import {
  TProviderContainerProps,
} from '../TypeAliases/TProviderContainerProps';

import * as React from 'react';

export class ProviderContainer extends React.PureComponent<TProviderContainerProps> {
  render() {
    const {
      children,
      store,
    } = this.props;

    return (
      <Provider store={store}>
        {children}
      </Provider>
    );
  }
}

export default hot(module)(ProviderContainer);