import {
  TPageProps
} from '../TypeAliases/TPageProps';

import * as React from 'react';

// @ts-ignore
import _styles from '../Styles/Pages/Loading.less';
const styles = _styles || {};

export class Loading extends React.PureComponent<TPageProps> {
  /* Uncomment to test styling, otherwise page disappears almost instantly. */
  /*componentDidMount() {
    debugger;
  }*/

  render() {
    return (
      <div className={`${styles.Loading} ${styles.Page}`}>
        <strong className={styles.Message}>
          Loading...
        </strong>

        {/* <div>
          <span className={styles.Icon}>
            ⟳
          </span>
        </div> */}
      </div>
    );
  }
}

export default Loading;