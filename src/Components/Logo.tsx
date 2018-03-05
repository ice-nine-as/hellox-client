import {
  ImageUrls,
} from '../Enums/ImageUrls';
import {
  LogoStates,
} from '../Enums/LogoStates';
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
        alt={`The main site logo. It reads "hello X."`}
        className={`${_styles.Logo} ${this.props.state}`}
        src={this.props.state === LogoStates.Normal ?
              ImageUrls.MainLogo :
              ImageUrls.SmallLogo}
      />
    );
  }
}

export default Logo;