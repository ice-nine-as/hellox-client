import * as React from 'react';

// @ts-ignore
import _styles from '../Styles/Components/PodcastSubscriptionLinks';
const styles = _styles || {};

export class PodcastSubscriptionLinks extends React.PureComponent {
  render() {
    return (
      <div className={styles.PodcastSubscriptionLinks}>
        <h3>
          SUBSCRIBE ON
        </h3>

        <p>
          <a
            className={styles.SubscribeLink}
            href="https://itunes.apple.com/no/podcast/hello-x/id1380756324&ls=1"
          >
            iTunes
          </a>

          &bull;
          
          <a
            className={styles.SubscribeLink}
            href="https://www.subscribeonandroid.com/www.blubrry.com/feeds/hello_x.xml"
          >
            Android
          </a>
        </p>

        <p>
          <a
            className={styles.SubscribeLink}
            href="https://www.stitcher.com/podcast/ice9/hello-x"
          >
            Stitcher
          </a>

          &bull;

          <a
            className={styles.SubscribeLink}
            href="https://soundcloud.com/hello_x"
          >
            SoundCloud 
          </a>
        </p>

        <p>
          <a
            className={styles.SubscribeLink}
            href="https://www.blubrry.com/feeds/hello_x.xml"
          >
            RSS
          </a>
        </p>
      </div>
    );
  }
}