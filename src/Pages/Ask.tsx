import {
  TPageProps
} from '../TypeAliases/TPageProps';

import * as React from 'react';

// @ts-ignore
import styles from '../Styles/Pages/Ask.less';

export class Ask extends React.PureComponent<TPageProps> {
  render() {
    return (
      <div className={styles.Ask}>
        Ask.
      </div>
    );
  }
}

export default Ask;