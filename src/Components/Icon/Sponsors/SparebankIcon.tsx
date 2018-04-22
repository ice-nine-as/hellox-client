import {
  Icon,
} from '../Icon';
import {
  ImageUrls,
} from '../../../Enums/ImageUrls';

import * as React from 'react';

// @ts-ignore
import _styles from '../../../Styles/Components/Icon/Sponsors/SponsorIcon.less';
const styles = _styles || {};

export class SparebankIcon extends React.PureComponent {
  render() {
    return (
      <Icon>
        <img
          alt="The Sparebank sponsor's logo."
          className={styles.SponsorIcon}
          src={ImageUrls.SponsorSparebankIcon}
        />
      </Icon>
    );
  }
}

export default SparebankIcon;