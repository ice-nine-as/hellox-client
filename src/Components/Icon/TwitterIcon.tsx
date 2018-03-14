import {
  Icon,
} from './Icon';
import {
  ImageUrls,
} from '../../Enums/ImageUrls';
import {
  TTwitterIconProps,
} from '../../TypeAliases/TTwitterIconProps';

import * as React from 'react';

// @ts-ignore
import styles from '../../Styles/Components/Icon/TwitterIcon.less';
const _styles = styles || {};

export class TwitterIcon extends React.PureComponent<TTwitterIconProps> {
  render() {
    return (
      <Icon>
        <img
          alt="The Twitter icon."
          className={_styles.TwitterIcon}
          src={ImageUrls.TwitterIcon} />
      </Icon>
    );
  }
}

export default TwitterIcon;