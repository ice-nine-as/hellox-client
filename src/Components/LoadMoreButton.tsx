import * as React from 'react';

// @ts-ignore
import _styles from '../Styles/Components/LoadMoreButton.less';
const styles = _styles || {};

export class LoadMoreButton extends React.PureComponent<{ func: (event: React.MouseEvent<HTMLButtonElement>) => void, }> {
  render() {
    return (
      <div className={styles.LoadMoreButton}>
        <button
          className={styles.Button}
          onClick={this.props.func}
        >
          LOAD MORE
        </button>
      </div>
    );
  }  
}

export default LoadMoreButton;