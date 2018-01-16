import * as React from 'react';

// @ts-ignore
import styles from '../Styles/Components/Footer.less';

export class Footer extends React.PureComponent<{}> {
  render() {
    return (
      <div className={(styles || {}).Footer}>
        Copyright {new Date().getFullYear()} Ice 9 AS.
      </div>
    );
  }
}

export default Footer;