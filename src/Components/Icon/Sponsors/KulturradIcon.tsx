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

export class KulturradIcon extends React.PureComponent {
  render() {
    return (
      <Icon>
        <img
          alt="The Kulturrad sponsor's logo."
          className={styles.SponsorIcon}
          src={ImageUrls.SponsorKulturradIcon}
        />
      </Icon>
    );
  }
}

export default KulturradIcon;