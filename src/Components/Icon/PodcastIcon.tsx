import {
  Icon,
} from './Icon';
import {
  ImageUrls,
} from '../../Enums/ImageUrls';
import {
  IIconProps,
} from '../../Interfaces/IIconProps';

import * as React from 'react';

// @ts-ignore
import _styles from '../../Styles/Components/Icon/PodcastIcon.less';
const styles = _styles || {};

export class PodcastIcon extends React.PureComponent<IIconProps> {
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
          alt="A drawing of a play button triangle."
          className={styles.PodcastIcon}
          src={ImageUrls.PodcastIcon}
        />
      </Icon>
    );
  }
}

export default PodcastIcon;