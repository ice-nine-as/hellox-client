import {
  TPageProps
} from '../TypeAliases/TPageProps';

import * as React from 'react';

// @ts-ignore
import styles from '../Styles/Pages/Listen.less';

export class Listen extends React.PureComponent<TPageProps> {
  render() {
    return (
      <div className={styles.Listen}>
        Listen.
      </div>
    );
  }
}

export default Listen;