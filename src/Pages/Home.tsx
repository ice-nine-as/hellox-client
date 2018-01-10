import {
  TPageProps,
} from '../TypeAliases/TPageProps';

import * as React from 'react';

// @ts-ignore
import styles from '../Styles//Pages/Home';

export class Home extends React.PureComponent<TPageProps> {
  render() {
    return (
      <div className={styles.Home}>
        <p className={`${styles.HomeParagraphFirst} ${styles.HomeParagraph}`}>
          Welcome to X50.
        </p>

        <p className={`${styles.HomeParagraphFirst} ${styles.HomeParagraph}`}>
          Coming soon.
        </p>
      </div>
    );
  }
}

export default Home;