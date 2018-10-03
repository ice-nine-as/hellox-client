import {
  THexagonProps,
} from '../TypeAliases/THexagonProps';

import * as React from 'react';

// @ts-ignore
import _styles from '../Styles/Components/Hexagon.less';
const styles = _styles || {};

const gold = '#dab239';
const deepPurple = '#343358';

export class Hexagon extends React.PureComponent<THexagonProps> {
  render() {
    const className = this.props.className ? ` ${this.props.className}` : '';
    const imageColor = className === ' active' ? gold : deepPurple;

    return (
      <div className={`${styles.Hexagon} ${className}`}>
        <svg
          version="1.1"
          className={styles.HexagonVector}
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="240px"
          height="240px"
          viewBox="0 0 240 240"
          enableBackground="new 0 0 240 240"
          xmlSpace="preserve"
        >
          <polygon
            fill={imageColor}
            points="224, 179.5 119.5, 239.5 15, 179.5 15, 59.5 119.5, -0.5 224, 59.5"
          />
        </svg>

        <h3 className={styles.Content}>
          {this.props.children}
        </h3>
      </div>
    );
  }
}

export default Hexagon;