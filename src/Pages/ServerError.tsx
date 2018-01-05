import {
  TPageProps,
} from '../TypeAliases/TPageProps';

import * as React from 'react';

export class ServerError extends React.Component<TPageProps> {
  render() {
    return (
      <div id="serverError">
        Unknown error. Sorry for the trouble!
      </div>
    );
  }
}

export default ServerError;