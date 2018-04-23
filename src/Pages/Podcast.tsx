import {
  createRssThunk,
} from '../Actions/Creators/createRssThunk';
import {
  FeedKeys,
} from '../Enums/FeedKeys';
import {
  IRssAction,
} from '../Actions/App/IRssAction';
import {
  connect,
  MapStateToProps,
} from 'react-redux';
/*import {
  ConnectedLatestPodcasts,
} from '../Components/LatestPodcasts';*/
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
import styles from '../Styles/Pages/Podcast.less';
import { PodcastItemFull } from '../Components/PodcastItemFull';
import { isNode } from '../Modules/isNode';
import { IPodcastPost } from '../Interfaces/IPodcastPost';
import { getFeed } from '../Modules/getFeed';
/*import { FeedDetailLevels } from '../Enums/FeedDetailLevels';*/
const _styles = styles || {};

export const strings = {
  LOAD_ERROR:
    'Sorry, an error was encountered loading the podcasts!',
};

export class Podcast extends React.Component<TPageProps & TPodcastStoreProps & TPodcastDispatchProps, { error: string, }> {
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
    } = getFeed({
      type: 'podcast',
      feeds,
      language,
    });

    if (!feed) {
      this.props.getPodcasts().then(
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
    } = getFeed({
      type: 'podcast',
      feeds,
      language,
    });

    const id = payload && (payload as any).id ?
      (payload as any).id.toString() :
      null;

    const child = (() => {
      if (this.state.error) {
        return this.state.error;
      } else if (!feed || !feed.items) {
        return 'Sorry, this podcast couldn\'t be found.';
      } else {
        const item = feed.items.filter((item) => {
          return item &&
                 item.guid &&
                 id === item.guid.split('/').filter((aa) => aa).slice(-1)[0];
        })[0] as IPodcastPost;

        if (item) {
          return <PodcastItemFull item={item} />;
        } else {
          return 'Sorry, this podcast couldn\'t be found.';
        }
      }
    })();

    return (
      <div className={`${_styles.Podcast} ${_styles.Page}`}>
        {child}

        {/*
          <ConnectedLatestPodcasts detailLevel={FeedDetailLevels.Teaser} />
        */}
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