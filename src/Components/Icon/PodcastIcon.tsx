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
      <Icon {...addIns}>
        <img
          alt="A drawing of a play button triangle."
          className={styles.PodcastIcon}
          src={ImageUrls.PodcastIcon} />
      </Icon>
    );
  }
}

export default PodcastIcon;