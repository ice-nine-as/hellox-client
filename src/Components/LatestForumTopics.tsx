import {
  createLatestForumPostsThunk,
} from '../Actions/Creators/createLatestForumPostsThunk';
import {
  IForumTopic,
} from '../Interfaces/IForumTopic';
import {
  ILatestForumPostsAction,
} from '../Actions/App/ILatestForumPostsAction';
import {
  isNode,
} from '../Modules/isNode';
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
import _styles from '../Styles/Components/LatestForumPosts.less';
const styles = _styles || {};

export class LatestForumPosts extends React.Component<TLatestForumPostsOwnProps & TLatestForumPostsStoreProps & TLatestForumPostsDispatchProps, { error: string, }> {
  constructor(props: any, context?: any) {
    super(props, context);

    this.state = {
      error: '',
    };

    this.doLoad = this.doLoad.bind(this);
  }

  async doLoad() {
    const {
      fetchLatestForumPosts,
    } = this.props;

    return fetchLatestForumPosts();
  }

  componentDidMount() {
    if (!isNode()) {
      const {
        latestForumTopics,
      } = this.props;

      /* Only autoload if the feed has never been fetched. */
      if (!latestForumTopics) {
        this.doLoad();
      }
    }
  }

  render() {
    let reactKey = -1;
    const {
      latestForumTopics,
    } = this.props;
    
    const topics = (() => {
      if (latestForumTopics &&
          latestForumTopics.topic_list &&
          latestForumTopics.topic_list.topics)
      {
        return latestForumTopics.topic_list.topics;
      }

      return null;
    })();


    const latestPosts = (() => {
      if (!topics) {
        return (
          <p
            className={styles.Message}
            key="___key"
          >
            Latest forum topics are loading...
          </p>
        );
      } else if (topics.length) {
        console.log(...topics);
        return topics.sort((aa, bb) => {
          if (aa.last_posted_at > bb.last_posted_at) {
            return -1;
          } else if (bb.last_posted_at > aa.last_posted_at) {
            return 1;
          } else {
            return 0;
          }
        }).slice(0, 3)
          .map((item: IForumTopic, index: number) => (
            <li
              className="test"
              key={index}  
            >
              <a href={`//forum.hellox.me/t/${item.slug}/${item.id}`}>
                <img
                  src={item.image_url}
                />

                {item.title}

                <div>
                  <time>
                    {item.last_posted_at}
                  </time>
                </div>

                <p>
                  {item.excerpt || 'Read more on the forum!'}
                </p>
              </a>
            </li>
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
        className={styles.LatestForumPosts}
        key={reactKey += 1}
      >
        <div className={styles.NewsContainer}>
          {
            this.state.error ?
              /* Display the error if loading fails. */
              <div style={{ textAlign: 'center', margin: '0 auto', }}>{this.state.error}</div> :
              <ul>
                {latestPosts}
              </ul>
          }
        </div>
      </div>
    );
  }
}

export const mapStateToProps: MapStateToProps<TLatestForumPostsOwnProps & TLatestForumPostsStoreProps, TLatestForumPostsOwnProps, TStoreProps> = ({
  latestForumTopics,
}, ownProps) => ({
  ...ownProps,
  latestForumTopics,
});

export const mapDispatchToProps = (dispatch: Function) => ({
  fetchLatestForumPosts(): Promise<ILatestForumPostsAction> {
    const controller = new AbortController();
    const { signal } = controller;
    const thunk = createLatestForumPostsThunk({ signal });
    return dispatch(thunk);
  },
});

export const ConnectedLatestForumPosts = connect(mapStateToProps, mapDispatchToProps)(LatestForumPosts);

export default LatestForumPosts;
