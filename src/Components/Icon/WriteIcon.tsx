import {
  Icon,
} from './Icon';
import {
  ImageUrls,
} from '../../Enums/ImageUrls';
import {
  TWriteIconProps,
} from '../../TypeAliases/TWriteIconProps';

import * as React from 'react';

// @ts-ignore
import styles from '../../Styles/Components/Icon/WriteIcon.less';
const _styles = styles || {};

export class WriteIcon extends React.PureComponent<TWriteIconProps> {
  render() {
    return (
      <Icon>
        <img
          alt="A stylized drawing of a pencil."
          className={_styles.WriteIcon}
          src={ImageUrls.WriteIcon}
        />
      </Icon>
    );
  }
}

export default WriteIcon;