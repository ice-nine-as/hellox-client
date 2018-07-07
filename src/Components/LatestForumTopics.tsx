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
  TLatestForumPostsState,
} from '../TypeAliases/TLatestForumPostsState';
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

export class LatestForumTopics extends React.Component<TLatestForumPostsOwnProps & TLatestForumPostsStoreProps & TLatestForumPostsDispatchProps, TLatestForumPostsState> {
  constructor(props: any, context?: any) {
    super(props, context);

    this.state = {
      offset: 0,
    };

    this.doLoad = this.doLoad.bind(this);
    this.doMoreTopics = this.doMoreTopics.bind(this);
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
      offset,
    } = this.state;

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
        const items = feed.items.slice(0, offset + 3).map((item, index) => (
            <ForumTopicPreview
              item={item}
              key={index}
            />
          ));
          
        if (offset >= feed.items.length) {
          return items.concat([
            <p
              className={styles.NoMoreTopics}
              key={'key1'}
            >
              No more recent forum topics. Check out
              the <a href="//forum.hellox.me">forum</a> to see older topics.
            </p>
          ]);
        } else {
          return items.concat([
            <div
              className={styles.LoadMoreContainer}
              key={'key2'}
            >
              <button
                className={`${styles.Button} light`}
                onClick={this.doMoreTopics}
              >
                MORE TOPICS
              </button>
            </div>,
          ]);
        }
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
          {latestTopics}
        </div>
      </div>
    );
  }

  doMoreTopics() {
    const {
      offset,
    } = this.state;

    this.setState({
      offset: offset + 3,
    });
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

export const ConnectedLatestForumTopics = connect(mapStateToProps, mapDispatchToProps)(LatestForumTopics);

export default LatestForumTopics;
