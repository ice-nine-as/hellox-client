import {
  storyGeneratorLogoPath,
} from '../Properties/storyGeneratorLogoPath';
import {
  TStoryGeneratorLogoProps,
} from '../TypeAliases/TStoryGeneratorLogoProps';

import * as React from 'react';

// @ts-ignore
import styles from '../Styles/Components/StoryGeneratorLogo.less';

const _styles = styles || {};

export class StoryGeneratorLogo extends React.PureComponent<TStoryGeneratorLogoProps> {
  render() {
    return (
      <img
        className={_styles.StoryGeneratorLogo}
        src={storyGeneratorLogoPath} />
    );
  }
}

export default StoryGeneratorLogo;