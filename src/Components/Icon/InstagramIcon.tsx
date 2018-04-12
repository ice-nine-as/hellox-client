import {
  ExternalPageUrls,
} from '../../Enums/ExternalPageUrls';
import {
  Icon,
} from './Icon';
import {
  ImageUrls,
} from '../../Enums/ImageUrls';
import {
  TInstagramIconProps,
} from '../../TypeAliases/TInstagramIconProps';

import * as React from 'react';

// @ts-ignore
import styles from '../../Styles/Components/Icon/InstagramIcon.less';
const _styles = styles || {};

export class InstagramIcon extends React.PureComponent<TInstagramIconProps> {
  render() {
    return (
      <Icon url={ExternalPageUrls.Instagram}>
        <img
          alt="The Instagram icon."
          className={_styles.InstagramIcon}
          src={ImageUrls.InstagramIcon} />
      </Icon>
    );
  }
}

export default InstagramIcon;