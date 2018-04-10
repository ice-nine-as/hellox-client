import {
  createRssThunk,
} from '../Actions/Creators/createRssThunk';
import {
  getFeed,
} from '../Modules/getFeed';
import {
  getFeedItem,
} from '../Modules/getFeedItem';
import {
  IRssAction,
} from '../Actions/App/IRssAction';
import {
  connect,
  MapStateToProps,
} from 'react-redux';
import {
  Languages,
} from '../Enums/Languages';
import {
  TFeedsMap,
} from '../TypeAliases/TFeedsMap';
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
const _styles = styles || {};

export class Podcast extends React.PureComponent<TPageProps & TPodcastStoreProps & TPodcastDispatchProps> {
  doLoad() {
    const {
      feeds,
      getPodcast,
      language,
      location: {
        payload,
      },
    } = this.props;

    /* Loads the relevant feed based on language and detail level. */ 
    const {
      feed,
    } = getFeed({
      feeds,
      language,
      type: 'newsItem',
    });

    const id = payload && (payload as any).id ? (payload as any).id.toString() : null;
    if (!id) {
      throw new Error('foo');
    }

    if (!feed || !getFeedItem(id, feed)) {
      getPodcast(id, feeds, language);
    }
  }

  componentDidMount() {
    this.doLoad();
  }

  render() {
    return (
      <div className={`${_styles.Podcast} ${_styles.Page}`}>
        {}
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
  getPodcast(id: string, feeds: TFeedsMap, language: Languages): Promise<IRssAction> {
    const {
      feed,
      key,
    } = getFeed({
      feeds,
      language,
      type: 'podcast',
    });

    const thunk = createRssThunk({
      composeWith: feed,
      feedKey:     key,
      id,
    });

    return dispatch(thunk);
  },
});

export const ConnectedPodcast = connect(mapStateToProps, mapDispatchToProps)(Podcast); 

export default ConnectedPodcast;