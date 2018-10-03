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
    const {
      children,
      dontLazyLoad,
      offset,
      url,
    } = this.props;

    const content = url ?
      <a href={url}>
        {children}
      </a> :
      children;

    return (
      <div className={`${styles.Icon} Icon`}>
        {
          dontLazyLoad ?
            content :
            <LazyLoad offset={offset || 600}>
              {content}
            </LazyLoad>
        }
      </div>
    );
  }
}

export default Icon;