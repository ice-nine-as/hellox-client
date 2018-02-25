import {
  TFooterProps,
} from '../TypeAliases/TFooterProps';

import * as React from 'react';

// @ts-ignore
import styles from '../Styles/Components/Footer.less';
const _styles = styles || {};

export class Footer extends React.PureComponent<TFooterProps> {
  render() {
    return (
      <div className={`${_styles.Footer} Footer`}>
        Copyright {new Date().getFullYear()} Ice 9 AS.
      </div>
    );
  }
}

export default Footer;