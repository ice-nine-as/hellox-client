import {
  createRssThunk,
} from '../Actions/Creators/createRssThunk';
import {
  FeedDetailLevels,
} from '../Enums/FeedDetailLevels';
import {
  FeedKeys,
} from '../Enums/FeedKeys';
import {
  pickFeed,
} from '../Functions/pickFeed';
import {
  IPodcastPost,
} from '../Interfaces/IPodcastPost';
import {
  IRssAction,
} from '../Actions/App/IRssAction';
import {
  isNode,
} from '../Functions/isNode';
import {
  PodcastItemFull,
} from '../Components/PodcastItemFull';
import {
  connect,
  MapStateToProps,
} from 'react-redux';
import {
  ConnectedLatestPodcasts,
} from '../Components/LatestPodcasts';
import {
  MailChimpSignup,
} from '../Components/MailChimpSignup';
import {
  TPageProps
} from '../TypeAliases/TPageProps';
import {
  TPodcastDispatchProps,
} from '../TypeAliases/TPodcastDispatchProps';
import {
  TPodcastStoreProps,
} from '../TypeAliases/TPodcastStoreProps';
import {
  TStoreProps,
} from '../TypeAliases/TStoreProps';

import * as React from 'react';

// @ts-ignore
import _styles from '../Styles/Pages/Podcast.less';
const styles = _styles || {};

export const strings = {
  LOAD_ERROR:
    'Sorry, an error was encountered loading the podcasts!',
};

export class Podcast extends React.Component<TPageProps & TPodcastStoreProps & TPodcastDispatchProps, { error: string, }> {
  state = {
    error: '',
  };

  /* TODO: Prevent multiple attempts to load the same resource? Set a maximum
   * number of attempts? */
  doLoad() {
    const {
      feeds,
      getPodcasts,
      language,
    } = this.props;

    /* Loads the relevant feed based on language and detail level. */
    const {
      feed,
    } = pickFeed({
      type: 'podcast',
      feeds,
      language,
    });

    if (!feed) {
      getPodcasts().then(
        () => {},
        () => this.setState({ error: strings.LOAD_ERROR, }) 
      );
    }
  }

  componentDidMount() {
    if (!isNode()) {
      this.doLoad();
    }
  }

  render() {
    const {
      feeds,
      language,
      location: {
        payload,
      },
    } = this.props;

    const {
      feed,
    } = pickFeed({
      type: 'podcast',
      feeds,
      language,
    });

    const id = payload && (payload as any).id ?
      (payload as any).id.toString() :
      null;

    let loaded = false;
    const child = (() => {
      if (this.state.error) {
        return this.state.error;
      } else if (!feed) {
        return <p className={styles.Message}>Podcast loading...</p>;
      } else {
        loaded = true;

        const item = feed.items.filter((item) => {
          return item &&
                 item.guid &&
                 id === item.guid.split('/').filter((aa) => aa).slice(-1)[0];
        })[0] as IPodcastPost;

        if (item) {
          return <PodcastItemFull item={item} />;
        } else {
          return <p className={styles.Message}>Sorry, this podcast couldn't be found.</p>;
        }
      }
    })();

    return (
      <div className={`${styles.Podcast} ${styles.Page}`}>
        {child}

        {
          loaded ?
            [
              <div className={styles.MorePodcastsContainer} key={1}>
                <h2 className={styles.MorePodcastsTitle}>
                  More Podcasts
                </h2>

                <ConnectedLatestPodcasts detailLevel={FeedDetailLevels.Teaser} />
              </div>,
              <hr className={styles.HorizontalRule} key={2} />,
              <MailChimpSignup key={3} />
            ] :
            null
        }
      </div>
    );
  }
}

export const mapStateToProps: MapStateToProps<TPodcastStoreProps, TPageProps, TStoreProps> = ({
  feeds,
  language,
  location,
}, ownProps) => ({
  ...ownProps,
  feeds,
  language,
  location,
});

export const mapDispatchToProps = (dispatch: Function) => ({
  getPodcasts(): Promise<IRssAction> {
    const thunk = createRssThunk({
      feedKey:  FeedKeys.Podcast,
    });

    return dispatch(thunk);
  },
});

export const ConnectedPodcast = connect(mapStateToProps, mapDispatchToProps)(Podcast); 

export default ConnectedPodcast;