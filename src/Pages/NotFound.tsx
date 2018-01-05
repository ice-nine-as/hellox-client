import {
  TPageProps,
} from '../TypeAliases/TPageProps';

import * as React from 'react';
// @ts-ignore
//import styles from '../Styles/NotFound';

export class NotFound extends React.Component<TPageProps> {
  render() {
    return (
      <div>
        <span>Sorry, you've been misdirected somehow!</span>
        <a href="/">Get me back to the home page!</a>
      </div>
    );
  }
}

export default NotFound;