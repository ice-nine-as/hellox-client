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
import _styles from '../../Styles/Components/Icon/FacebookIcon.less';
const styles = _styles || {};

export class FacebookIcon extends React.PureComponent<IIconProps> {
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
      <Icon
        url={ExternalPageUrls.Facebook}
        {...addIns}  
      >
        <img
          alt="The Facebook icon."
          className={styles.FacebookIcon}
          src={ImageUrls.FacebookIcon}
        />
      </Icon>
    );
  }
}

export default FacebookIcon;