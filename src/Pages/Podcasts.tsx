import {
  createRssThunk,
} from '../Actions/Creators/createRssThunk';
/*import {
  FeedDetailLevels,
} from '../Enums/FeedDetailLevels';*/
import {
  getFeed,
} from '../Modules/getFeed';
import {
  IPodcastPost,
} from '../Interfaces/IPodcastPost';
import {
  IRssAction,
} from '../Actions/App/IRssAction';
import {
  IRssFeed,
} from '../Interfaces/IRssFeed';
import {
  isNode,
} from '../Modules/isNode';
/*import {
  ConnectedLatestPodcasts,
} from '../Components/LatestPodcasts';*/
import {
  PodcastItemFull,
} from '../Components/PodcastItemFull';
import {
  connect,
  MapStateToProps,
} from 'react-redux';
import {
  TFeedsMap,
} from '../TypeAliases/TFeedsMap';
import {
  TPageProps
} from '../TypeAliases/TPageProps';
import {
  TPodcastsDispatchProps,
} from '../TypeAliases/TPodcastsDispatchProps';
import {
  TPodcastsStoreProps,
} from '../TypeAliases/TPodcastsStoreProps';
import {
  TStoreProps,
} from '../TypeAliases/TStoreProps';
import {
  VoiceMemoForm,
} from '../Components/VoiceMemoForm';

import * as React from 'react';

// @ts-ignore
import styles from '../Styles/Pages/Podcasts.less';
const _styles = styles || {};

export const strings = {
  LOAD_ERROR:
    'Sorry, an error was encountered loading the podcasts!',
};

export class Podcasts extends React.Component<TPageProps & TPodcastsStoreProps & TPodcastsDispatchProps, { error: string, }> {
  constructor(props: any, context?: any) {
    super(props, context);

    this.state = {
      error: '',
    };
  }

  /* TODO: Prevent multiple attempts to load the same resource? Set a maximum
   * number of attempts? */
  doLoad() {
    const {
      feeds,
      language,
    } = this.props;

    /* Loads the relevant feed based on language and detail level. */
    const {
      feed,
      key,
    } = getFeed({
      type: 'podcast',
      feeds,
      language,
    });

    if (!feed) {
      this.props.getPodcastFeed(key).then(
        () => {},
        () => this.setState({ error: strings.LOAD_ERROR, }) 
      );
    }
  }

  componentDidMount() {
    /* Don't load within the component on the server. */
    if (!isNode()) {
      this.doLoad();
    }
  }

  render() {
    const {
      feeds,
      language,
    } = this.props;

    let children: any = null;

    const {
      feed,
    } = getFeed({
      type: 'podcast',
      feeds,
      language,
    });

    if (this.state.error) {
      children = this.state.error;
    } else if (!feed) {
      children = 'Podcast loading...';
    } else if (feed.items) {
      if (feed.items.length) {
        /* TODO: add type guards for podcast posts? */
        children = [
          /* Display the first podcast in full. */
          <PodcastItemFull
            item={feed.items[0] as IPodcastPost}
            key="keyOne"
          />,

          <div
            className={_styles.SubscribeWrapper}
            key="sub"
          >
            <h3>
              SUBSCRIBE ON
            </h3>
            
            <p>
              {/*Apple Podcasts &bull; RadioPublic*/}
            </p>

            <p>
              {/*Google Play &bull; Spotify &bull; */}
              <a
                className={_styles.SubscribeLink}
                href="https://www.subscribeonandroid.com/www.blubrry.com/feeds/hello_x.xml"
              >
                Android
              </a>

              &bull;

              <a
                className={_styles.SubscribeLink}
                href="https://www.blubrry.com/feeds/hello_x.xml"
              >
                RSS
              </a>
            </p>
          </div>,

          /* Display previews of all podcasts. */
          /*<div
            className={_styles.Content}
            key="keyThree"
          >
            <ConnectedLatestPodcasts
              detailLevel={FeedDetailLevels.Teaser}
              key="keyTwo"
            />
          </div>*/,
        ];
      } else {
        children = 'No podcasts yet. Sorry!';
      }
    }

    return (
      <div className={`${_styles.Podcasts} ${_styles.Page}`}>
        {children}

        <VoiceMemoForm />

        {/*<div className={`${_styles.LeaveAMessageWrapper} ${_styles.SubscribeWrapper}`}>
          <div className={`${_styles.LeaveAMessage}`}>
            <h4>
              Leave a message
            </h4>

            <p>
              We would love to hear from you!
              <br />
              Do you have any ideas or...
            </p>

            <div className={_styles.RecordButton}>
              <div className={_styles.RecordButtonDot}></div>

              <p>
                START RECORDING
              </p>
            </div>

            <p>
              Note: Your message won't be sent until you press "Send"
            </p>
          </div>
        </div>*/}
      </div>
    );
  }
}

export const mapStateToProps: MapStateToProps<TPodcastsStoreProps, TPageProps, TStoreProps> = ({
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
  getPodcastFeed(
    feedKey: keyof TFeedsMap,
    offset: number = 0,
    composeWith: IRssFeed | null = null
  ): Promise<IRssAction>
  {
    const thunk = createRssThunk({
      composeWith,
      feedKey: feedKey,
      offset: offset || 0,
    });

    return dispatch(thunk);
  },
});

export const ConnectedPodcasts = connect(mapStateToProps, mapDispatchToProps)(Podcasts);

export default ConnectedPodcasts;