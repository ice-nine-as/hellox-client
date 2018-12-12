import {
  FeedDetailLevels,
} from '../Enums/FeedDetailLevels';
import {
  ConnectedLatestPodcasts,
} from '../Components/LatestPodcasts';
import {
  MailChimpSignup,
} from '../Components/MailChimpSignup';
import {
  PodcastSubscriptionWidget,
} from '../Components/PodcastSubscriptionWidget';
import {
  TPageProps
} from '../TypeAliases/TPageProps';
import {
  VoiceMemoForm,
} from '../Components/VoiceMemoForm';

import * as React from 'react';

// @ts-ignore
import _styles from '../Styles/Pages/Podcasts.less';
const styles = _styles || {};

export const strings = {
  LOAD_ERROR:
    'Sorry, an error was encountered loading the podcasts!',
};

export class Podcasts extends React.Component<TPageProps> {

  render() {
    return (
      <div className={`${styles.Podcasts} ${styles.Page}`}>
        <h1 className={styles.Title}>
          Podcasts
        </h1>

        <div className={styles.Wrapper}>
          <div
            className={styles.SubscribeWrapper}
            key="sub"
          >
            <PodcastSubscriptionWidget />
          </div>

          <div
            className={styles.Content}
            key="keyThree"
          >
            <ConnectedLatestPodcasts
              detailLevel={FeedDetailLevels.Teaser}
              key="keyTwo"
            />
          </div>
        </div>

        <hr className={styles.HorizontalRule} />

        <MailChimpSignup />

        <hr className={styles.HorizontalRule} />

        <VoiceMemoForm />
      </div>
    );
  }
}
export default Podcasts;
