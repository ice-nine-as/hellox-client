import {
  Icon,
} from './Icon';
import {
  ImageUrls,
} from '../../Enums/ImageUrls';
import {
  TFacebookIconProps,
} from '../../TypeAliases/TFacebookIconProps';

import * as React from 'react';

// @ts-ignore
import styles from '../../Styles/Components/Icon/FacebookIcon.less';
const _styles = styles || {};

export class FacebookIcon extends React.PureComponent<TFacebookIconProps> {
  render() {
    return (
      <Icon>
        <img
          alt="The Facebook icon."
          className={_styles.FacebookIcon}
          src={ImageUrls.FacebookIcon} />
      </Icon>
    );
  }
}

export default FacebookIcon;