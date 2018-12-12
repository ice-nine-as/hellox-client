import {
  IButtonProps,
} from '../Interfaces/IButtonProps';

import * as React from 'react';

// @ts-ignore
import _styles from '../Styles/Components/Button.less';
const styles = _styles || {};

export class Button extends React.PureComponent<IButtonProps> {
  render() {
    const {
      children,
      func,
    } = this.props;

    return (
      <div className={styles.LoadMoreContainer}>
        <button
          className={`${styles.Button} light`}
          onClick={func}
        >
          {children}
        </button>
      </div>
    );
  }  
}

export default Button;
