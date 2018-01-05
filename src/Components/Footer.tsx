import * as React from 'react';

export class Footer extends React.Component {
  render() {
    return (
      <div id="footer">
        Copyright {new Date().getFullYear()} Ice 9 AS.
      </div>
    );
  }
}

export default Footer;