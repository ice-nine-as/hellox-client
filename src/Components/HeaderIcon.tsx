import {
  THeaderIconProps,
} from '../TypeAliases/THeaderIconProps';

import * as React from 'react';

// @ts-ignore
import styles from '../Styles/Components/HeaderIcon';

export class HeaderIcon extends React.PureComponent<THeaderIconProps> {
  render() {
    return <img src={this.props.url} className={styles.HeaderIcon} />;
  }
}

export default HeaderIcon;