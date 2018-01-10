import {
  TPageProps
} from '../TypeAliases/TPageProps';

import * as React from 'react';

// @ts-ignore
import styles from '../Styles/Pages/About';

export class About extends React.PureComponent<TPageProps> {
  render() {
    return (
      <div className={styles.About}>
        About.
      </div>
    );
  }
}

export default About;