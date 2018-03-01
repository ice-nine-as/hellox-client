import {
  Icon,
} from './Icon';
import {
  ImageUrls,
} from '../../Enums/ImageUrls';
import {
  TReadDiscussIconProps,
} from '../../TypeAliases/TReadDiscussIconProps';

import * as React from 'react';

// @ts-ignore
import styles from '../../Styles/Components/Icon/ReadDiscussIcon.less';
const _styles = styles || {};

export class ReadDiscussIcon extends React.PureComponent<TReadDiscussIconProps> {
  render() {
    return (
      <Icon>
        <img
          className={_styles.ReadDiscussIcon}
          src={ImageUrls.ReadDiscussIcon} />
      </Icon>
    );
  }
}

export default ReadDiscussIcon;