import {
  App,
} from './App';
import {
  Provider,
} from 'react-redux';
import {
  TProviderContainerProps,
} from '../TypeAliases/TProviderContainerProps';

// @ts-ignore
import AppContainer from 'react-hot-loader/lib/AppContainer';
import * as React from 'react';

export class ProviderContainer extends React.PureComponent<TProviderContainerProps> {
  render() {
    return (
      <Provider store={this.props.store}>
        <AppContainer>
          <App />
        </AppContainer>
      </Provider>
    );
  }
}