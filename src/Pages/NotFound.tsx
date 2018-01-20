import {
  TPageProps,
} from '../TypeAliases/TPageProps';

import * as React from 'react';

// @ts-ignore
import styles from '../Styles/Pages/NotFound.less';

export class NotFound extends React.PureComponent<TPageProps> {
  render() {
    return (
      <div className={styles.NotFound}>
        <p className={`${styles.NotFoundParagraphFirst} ${styles.NotFoundParagraph}`}>
          Sorry, you've been misdirected somehow!
        </p>
        
        <p className={`${styles.NotFoundParagraphSecond} ${styles.NotFoundParagraph}`}>
          <a href="/" className={`${styles.NotFoundLink}`}>
            Get me back to the home page!
          </a>
        </p>
      </div>
    );
  }
}

export default NotFound;