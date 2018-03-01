import {
  TIconProps,
} from '../../TypeAliases/TIconProps';

import * as React from 'react';
const LazyLoad = require('react-lazy-load').default;

export class Icon extends React.PureComponent<TIconProps> {
  render() {
    return (
      <LazyLoad offsetVertical={this.props.offsetVertical || 250}>
        {this.props.children}
      </LazyLoad>
    );
  }
}

export default Icon;