import {
  Icon,
} from './Icon';
import {
  ImageUrls,
} from '../../Enums/ImageUrls';
import {
  TPodcastIconProps,
} from '../../TypeAliases/TPodcastIconProps';

import * as React from 'react';

// @ts-ignore
import styles from '../../Styles/Components/Icon/PodcastIcon.less';
const _styles = styles || {};

export class PodcastIcon extends React.PureComponent<TPodcastIconProps> {
  render() {
    return (
      <Icon>
        <img
          className={_styles.PodcastIcon}
          src={ImageUrls.PodcastIcon} />
      </Icon>
    );
  }
}

export default PodcastIcon;