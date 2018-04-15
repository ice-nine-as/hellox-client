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

export class FramIcon extends React.PureComponent {
  render() {
    return (
      <Icon>
        <img
          alt="The FRAM sponsor's logo."
          className={styles.SponsorIcon}
          src={ImageUrls.SponsorFramIcon}
        />
      </Icon>
    );
  }
}

export default FramIcon;