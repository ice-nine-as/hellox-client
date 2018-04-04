import {
  THexagonProps,
} from '../TypeAliases/THexagonProps';

import * as React from 'react';

// @ts-ignore
import styles from '../Styles/Components/Hexagon.less';
const _styles = styles || {};

export class Hexagon extends React.PureComponent<THexagonProps> {
  render() {
    const className = this.props.className ? ` ${this.props.className}` : '';

    return (
      <div className={`${_styles.Hexagon} Hexagon${className}`}>
        {this.props.children}
      </div>
    );
  }
}

export default Hexagon;