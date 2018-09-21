import {
  TPodcastSubscriptionLinkProps,
} from '../TypeAliases/TPodcastSubscriptionLinkProps';

import * as React from 'react';

// @ts-ignore
import _styles from '../Styles/Components/PodcastSubscriptionLink.less';
const styles = _styles || {};

export class PodcastSubscriptionLink extends React.PureComponent<TPodcastSubscriptionLinkProps> {
  render() {
    const {
      title,
      url,
    } = this.props;

    return (
      <div className={styles.PodcastSubscriptionLink}>
        <a
          className={styles.SubscribeLink}
          href={url}
        >
          <span className={styles.SubscribeOpener}>
            Via&nbsp;
          </span>

          <span className={styles.SubscribeDestination}>
            {title}
          </span>
        </a>
      </div>
    )
  }
}

export default PodcastSubscriptionLink;