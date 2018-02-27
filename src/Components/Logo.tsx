import {
  logoImagePath,
} from '../Properties/logoImagePath';
import {
  TLogoProps,
} from '../TypeAliases/TLogoProps';

import * as React from 'react';

// @ts-ignore
import styles from '../Styles/Components/Logo.less';
const _styles = styles || {};

export class Logo extends React.PureComponent<TLogoProps> {
  render() {
    return (
      <img
        className={_styles.Logo}
        src={logoImagePath} />
    );
  }
}

export default Logo;