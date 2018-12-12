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
  ILatestForumTopicsAction,
} from '../Actions/App/ILatestForumTopicsAction';
import {
  isNode,
} from '../Functions/isNode';
import {
  pickFeed,
} from '../Functions/pickFeed';
import {
  PreviewFeed,
} from './PreviewFeed';
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

export class LatestForumTopics extends React.PureComponent<TLatestForumPostsOwnProps & TLatestForumPostsStoreProps & TLatestForumPostsDispatchProps> {
  constructor(props: any, context?: any) {
    super(props, context);

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

    return (
      <div
        className={styles.LatestForumTopics}
        key={reactKey += 1}
      >
        <div className={styles.ForumTopicsContainer}>
          <PreviewFeed
            childComponentConstructor={ForumTopicPreview}
            feed={feed}
            noMorePostsUrl="https://forum.hellox.me"
            pagination={true}
          />
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
  fetchLatestForumPosts(): Promise<ILatestForumTopicsAction> {
    const thunk = createRssThunk({
      feedKey: FeedKeys.ForumTopics,
    });
  
    return dispatch(thunk);
  },
});

export const ConnectedLatestForumTopics = connect(mapStateToProps, mapDispatchToProps)(LatestForumTopics);

export default LatestForumTopics;
