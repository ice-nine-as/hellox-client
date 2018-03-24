import {
  TIconProps,
} from '../../TypeAliases/TIconProps';

import * as React from 'react';
const LazyLoad = require('react-lazy-load').default;

export class Icon extends React.PureComponent<TIconProps> {
  render() {
    return (
      <LazyLoad offset={this.props.offset || 400}>
        {this.props.children}
      </LazyLoad>
    );
  }
}

export default Icon;