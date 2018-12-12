import {
  Button,
} from './Button';
import {
  IPreviewFeedProps,
} from '../Interfaces/IPreviewFeedProps';
import {
  IPreviewFeedState,
} from '../Interfaces/IPreviewFeedState';

import * as React from 'react';

// @ts-ignore
import _styles from '../Styles/Components/PreviewFeed.less';
const styles = _styles || {};

export class PreviewFeed extends React.PureComponent<IPreviewFeedProps, IPreviewFeedState> {
  public state = {
    offset: 0,
  }

  constructor(props: any, context?: any) {
    super(props, context);

    this.advanceFeed = this.advanceFeed.bind(this);
  }

  render() {
    const {
      childComponentConstructor,
      feed,
      noMorePostsUrl,
      pagination,
    } = this.props;

    const {
      offset,
    } = this.state;

    if (!feed) {
      return (
        <p className={styles.Message}>
          Latest posts are loading...
        </p>
      );
    } else if (feed.items.length) {
      let trueOffset = offset;
      /* Allow the parent component to determine whether the results are 
       * paginated in groups of 3 with a "Show more" (or etc.) button. */
      if (pagination) {
        trueOffset = feed.items.length - 3;
      }

      let items: React.ReactElement<any>[] = (
        feed.items.slice(0, trueOffset + 3).map((item, index) => (
          React.createElement(childComponentConstructor, {
            item,
            key: index,
          })
        ))
      );

      if (!pagination) {
        if (offset >= feed.items.length) {
          items = items.concat([
            <p
              className={styles.NoMoreTopics}
              key={'key1'}
            >
              No more recent posts.

              {noMorePostsUrl ? [
                'Check out the ',
                <a href={noMorePostsUrl}>forum</a>,
                ' to see older topics.',
              ] : ''}
            </p>
          ]);
        } else {
          items = items.concat([
            <div
              className={styles.LoadMoreContainer}
              key={'key2'}
            >
              <Button func={this.advanceFeed}>
                LOAD MORE
              </Button>
            </div>,
          ]);
        }
      }

      return items;
    } else {
      return (
        <p key="____key" style={{ textAlign: 'center', margin: '0 auto', }}>
          Sorry, no posts yet!
        </p>
      );
    }
  }

  public advanceFeed() {
    const {
      offset,
    } = this.state;

    this.setState({
      offset: offset + 3,
    });
  }
}

export default PreviewFeed;
