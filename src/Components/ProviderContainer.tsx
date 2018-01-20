import {
  default as AppContainer,
  // @ts-ignore
} from 'react-hot-loader/lib/AppContainer';
import {
  Provider,
} from 'react-redux';
import {
  TProviderContainerProps,
} from '../TypeAliases/TProviderContainerProps';

import * as React from 'react';

export class ProviderContainer extends React.PureComponent<TProviderContainerProps> {
  render() {
    return (
      <AppContainer>
        <Provider store={this.props.store}>
          {this.props.children}
        </Provider>
      </AppContainer>
    );
  }
}

export default ProviderContainer;