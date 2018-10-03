import {
  Icon,
} from './Icon';
import {
  IIconProps,
} from '../../Interfaces/IIconProps';
import {
  ImageUrls,
} from '../../Enums/ImageUrls';

import * as React from 'react';

// @ts-ignore
import _styles from '../../Styles/Components/Icon/WriteIcon.less';
const styles = _styles || {};

export class WriteIcon extends React.PureComponent<IIconProps> {
  render() {
    const {
      dontLazyLoad,
      offset,
      url,
    } = this.props;

    const addIns: { [key: string]: any } = {};
    if (dontLazyLoad) {
      addIns.dontLazyLoad = dontLazyLoad;
    }

    if (offset) {
      addIns.offset = offset;
    }

    if (url) {
      addIns.url = url;
    }

    return (
      <Icon {...addIns}>
        <img
          alt="A stylized drawing of a pencil."
          className={styles.WriteIcon}
          src={ImageUrls.WriteIcon}
        />
      </Icon>
    );
  }
}

export default WriteIcon;