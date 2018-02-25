import {
  TPodcastProps,
} from '../TypeAliases/TPodcastProps';

import * as React from 'react';

// @ts-ignore
import styles from '../Styles/Components/Podcast.less';
const _styles = styles || {};

export class Podcast extends React.PureComponent<TPodcastProps> {
  render() {
    return (
      <iframe
        className={_styles.Podcast}
        src="https://embed.radiopublic.com/e?if=welcome-to-night-vale-3GZp96&ge=s1!7b33150021824efaa90113e7a4cd34552ba80235"
        frameBorder="0"
        sandbox="allow-same-origin allow-scripts allow-top-navigation allow-popups"
        scrolling="no"
        width="100%"
        height="180px"
      >
      </iframe>
    );
  }
}

export default Podcast;