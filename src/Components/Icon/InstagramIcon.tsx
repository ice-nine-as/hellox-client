import {
  ExternalPageUrls,
} from '../../Enums/ExternalPageUrls';
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
import _styles from '../../Styles/Components/Icon/InstagramIcon.less';
const styles = _styles || {};

export class InstagramIcon extends React.PureComponent<IIconProps> {
  render() {
    const addIns: { [key: string]: any } = {};
    if (this.props.dontLazyLoad) {
      addIns.dontLazyLoad = this.props.dontLazyLoad;
    }

    if (this.props.offset) {
      addIns.offset = this.props.offset;
    }

    if (this.props.url) {
      addIns.url = this.props.url;
    }

    return (
      <Icon
        url={ExternalPageUrls.Instagram}
        {...addIns}
      >
        <img
          alt="The Instagram icon."
          className={styles.InstagramIcon}
          src={ImageUrls.InstagramIcon} />
      </Icon>
    );
  }
}

export default InstagramIcon;