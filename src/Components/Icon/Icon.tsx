import {
  IIconProps,
} from '../../Interfaces/IIconProps';

import * as React from 'react';
const LazyLoad = require('react-lazy-load').default;

// @ts-ignore
import _styles from '../../Styles/Components/Icon/Icon.less';
const styles = _styles || {};

export class Icon extends React.PureComponent<IIconProps> {
  render() {
    const content = this.props.url ?
      <a href={this.props.url}>
        {this.props.children}
      </a> :
      this.props.children;

    return (
      <div className={`${styles.Icon} Icon`}>
        {
          this.props.dontLazyLoad ?
            content :
            <LazyLoad offset={this.props.offset || 600}>
              {content}
            </LazyLoad>
        }
      </div>
    );
  }
}

export default Icon;