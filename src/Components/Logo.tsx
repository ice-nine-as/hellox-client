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
import _styles from '../Styles/Components/Logo.less';
const styles = _styles || {};

export class Logo extends React.PureComponent<TLogoProps> {
  render() {
    const {
      state,
    } = this.props;

    return (
      <img
        alt={`The main site logo. It reads "hello X."`}
        className={`${styles.Logo} ${state}`}
        src={state === LogoStates.Normal ?
              ImageUrls.MainLogo :
              ImageUrls.SmallLogo}
      />
    );
  }
}

export default Logo;