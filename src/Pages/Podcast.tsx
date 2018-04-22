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
/*import { FeedDetailLevels } from '../Enums/FeedDetailLevels';*/
const _styles = styles || {};

export class Podcast extends React.PureComponent<TPageProps & TPodcastStoreProps & TPodcastDispatchProps> {
  doLoad() {
    const {
      feeds: {
        Podcast: feed,
      },

      getPodcasts,
      location: {
        payload,
      },
    } = this.props;

    const id = payload && (payload as any).id ? (payload as any).id.toString() : null;
    if (!id) {
      return;
    } else if (!feed) {
      getPodcasts();
    }
  }

  componentDidMount() {
    if (!isNode()) {
      this.doLoad();
    }
  }

  render() {
    const {
      feeds: {
        Podcast: feed,
      },

      location: {
        payload,
      },
    } = this.props;

    const id = payload && (payload as any).id ?
      (payload as any).id.toString() :
      null;

    const item = (() => {
      if (!feed || !feed.items) {
        return null;
      } else {
        return feed.items.filter((item) => {
          return item &&
                 item.guid &&
                 id === item.guid.split('/').filter((aa) => aa).slice(-1)[0];
        })[0] as IPodcastPost;
      }
    })();

    return (
      <div className={`${_styles.Podcast} ${_styles.Page}`}>
        {
          item ?
            <PodcastItemFull item={item} /> :
            'Sorry, this podcast couldn\'t be found.'
        }

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