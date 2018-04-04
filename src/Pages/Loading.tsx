import {
  TPageProps
} from '../TypeAliases/TPageProps';

import * as React from 'react';

// @ts-ignore
import styles from '../Styles/Pages/Loading.less';
const _styles = styles || {};

export class Loading extends React.PureComponent<TPageProps> {
  render() {
    return (
      <div className={`${_styles.Loading} ${_styles.Page}`}>
        <strong className={_styles.Message}>Loading...</strong>
        <div>
          <span className={_styles.Icon}>
            ⟳
          </span>
        </div>
      </div>
    );
  }
}

export default Loading;