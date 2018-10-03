import * as React from 'react';

// @ts-ignore
import _styles from '../Styles/Components/LoadMoreButton.less';
const styles = _styles || {};

export class LoadMoreButton extends React.PureComponent<{ func: (event: React.MouseEvent<HTMLButtonElement>) => void, }> {
  render() {
    const {
      func,
    } = this.props;

    return (
      <div className={styles.LoadMoreContainer}>
        <button
          className={`${styles.Button} light`}
          onClick={func}
        >
          LOAD MORE
        </button>
      </div>
    );
  }  
}

export default LoadMoreButton;