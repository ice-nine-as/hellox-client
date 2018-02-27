import {
  TPageProps
} from '../TypeAliases/TPageProps';

import * as React from 'react';

// @ts-ignore
import styles from '../Styles/Pages/Write.less';

export class Write extends React.PureComponent<TPageProps> {
  render() {
    return (
      <div className={styles.Write}>
        Write.
      </div>
    );
  }
}

export default Write;