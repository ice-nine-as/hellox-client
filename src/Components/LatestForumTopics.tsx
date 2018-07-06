import {
  createRssThunk,
} from '../Actions/Creators/createRssThunk';
import {
  FeedKeys,
} from '../Enums/FeedKeys';
import {
  ForumTopicPreview,
} from './ForumTopicPreview';
import {
  ILatestForumPostsAction,
} from '../Actions/App/ILatestForumPostsAction';
import {
  isNode,
} from '../Functions/isNode';
import {
  pickFeed,
} from '../Functions/pickFeed';
import {
  connect,
  MapStateToProps,
} from 'react-redux';
import {
  TLatestForumPostsDispatchProps,
} from '../TypeAliases/TLatestForumPostsDispatchProps';
import {
  TLatestForumPostsOwnProps,
} from '../TypeAliases/TLatestForumPostsOwnProps';
import {
  TLatestForumPostsStoreProps,
} from '../TypeAliases/TLatestForumPostsStoreProps';
import {
  TStoreProps,
} from '../TypeAliases/TStoreProps';

import * as React from 'react';

// @ts-ignore
import _styles from '../Styles/Components/LatestForumTopics.less';
const styles = _styles || {};

export class LatestForumTopics extends React.Component<TLatestForumPostsOwnProps & TLatestForumPostsStoreProps & TLatestForumPostsDispatchProps, { error: string, }> {
  constructor(props: any, context?: any) {
    super(props, context);

    this.state = {
      error: '',
    };

    this.doLoad = this.doLoad.bind(this);
  }

  async doLoad() {
    const {
      feeds,
      fetchLatestForumPosts,
      language,
    } = this.props;

    const {
      feed,
    } = pickFeed({
      type: 'forumTopics',
      feeds,
      language,
    });

    /* Only autoload if the feed has never been fetched. */
    if (!feed) {
      fetchLatestForumPosts();
    }
  }

  componentDidMount() {
    /* Do not fetch on the server. If fetching is done, it's taken care of
     * elsewhere. */
    if (!isNode()) {
      this.doLoad();
    }
  }

  render() {
    let reactKey = -1;
    const {
      feeds,
      language,
    } = this.props;

    const {
      feed,
    } = pickFeed({
      type: 'forumTopics',
      feeds,
      language,
    });

    const latestTopics = (() => {
      if (!feed) {
        return (
          <p
            className={styles.Message}
            key="___key"
          >
            Latest forum topics are loading...
          </p>
        );
      } else if (feed.items.length) {
        return feed.items.slice(0, 3).map((item, index) => (
            <ForumTopicPreview
              item={item}
              key={index}
            />
          ));
      } else {
        return (
          <p key="____key" style={{ textAlign: 'center', margin: '0 auto', }}>
            Sorry, no forum topics yet!
          </p>
        );
      }
    })();

    return (
      <div
        className={styles.LatestForumTopics}
        key={reactKey += 1}
      >
        <div className={styles.ForumTopicsContainer}>
          {
            this.state.error ?
              /* Display the error if loading fails. */
              <div style={{ textAlign: 'center', margin: '0 auto', }}>{this.state.error}</div> :
              latestTopics
          }
        </div>
      </div>
    );
  }
}

export const mapStateToProps: MapStateToProps<TLatestForumPostsOwnProps & TLatestForumPostsStoreProps, TLatestForumPostsOwnProps, TStoreProps> = ({
  feeds,
  language,
}, ownProps) => ({
  ...ownProps,
  feeds,
  language,
});

export const mapDispatchToProps = (dispatch: Function) => ({
  fetchLatestForumPosts(): Promise<ILatestForumPostsAction> {
    const thunk = createRssThunk({
      feedKey: FeedKeys.ForumTopics,
    });
  
    return dispatch(thunk);
  },
});

export const ConnectedLatestForumPosts = connect(mapStateToProps, mapDispatchToProps)(LatestForumTopics);

export default LatestForumTopics;
