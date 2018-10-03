import {
  THiderButtonProps,
} from '../TypeAliases/THiderButtonProps';
import {
  THiderButtonState,
} from '../TypeAliases/THiderButtonState';
import * as React from 'react';

// @ts-ignore
import _styles from '../Styles/Components/HiderButton.less';
const styles = _styles || {};

export class HiderButton extends React.Component<THiderButtonProps, THiderButtonState> {
  state = {
    hidden: true,
  };

  constructor(props: THiderButtonProps, context?: any) {
    super(props, context);

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    const {
      hidden,
    } = this.state;

    this.setState({
      hidden: !hidden,
    });
  }

  render() {
    const {
      buttonDisplay,
      children,
    } = this.props;

    const {
      hidden,
    } = this.state;

    return (
      <div className={styles.HiderButton}>
        <button
          className={styles.Button}
          onClick={this.toggle}
        >
          <strong>
            {buttonDisplay}
            <span className={styles.HiderArrow}>
              {hidden ?
                '◀' :
                '▼'
              }
            </span>
          </strong>
        </button>

        <div className={`${styles.Content}${hidden ? ' hidden' : ''}`}>
          {children}
        </div>
      </div>
    );
  }
}

export default HiderButton;