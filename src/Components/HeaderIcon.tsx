import {
  THeaderIconProps,
} from '../TypeAliases/THeaderIconProps';

import * as React from 'react';

// @ts-ignore
import styles from '../Styles/Components/HeaderIcon.less';

export class HeaderIcon extends React.PureComponent<THeaderIconProps> {
  render() {
    return (
      <img
        className={(styles || {}).HeaderIcon}
        src={this.props.url}
      />
    );
  }
}

export default HeaderIcon;