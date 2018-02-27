import {
  TPageProps
} from '../TypeAliases/TPageProps';

import * as React from 'react';

// @ts-ignore
import styles from '../Styles/Pages/Footnotes.less';

export class Footnotes extends React.PureComponent<TPageProps> {
  render() {
    return (
      <div className={styles.Footnotes}>
        Footnotes.
      </div>
    );
  }
}

export default Footnotes;