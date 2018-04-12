import {
  TPodcastItemPreviewProps,
} from '../TypeAliases/TPodcastItemPreviewProps';

import * as React from 'react';

// @ts-ignore
import styles from '../Styles/Components/PodcastItemPreview.less';
const _styles = styles || {};

export class PodcastItemPreview extends React.PureComponent<TPodcastItemPreviewProps> {
  getPreparedHtml(str: string): { __html: string, } {
    return { __html: str, }
  }

  render() {
    const img = (() => {
      if (this.props.item &&
          this.props.item['itunes:image'] &&
          this.props.item['itunes:image']['#'])
      {
        /* Use the episode image. */
        return (
          <img
            className={_styles.EpisodeHero}
            src={this.props.item['itunes:image']['#']}
          />
        );
      }

      if (this.props.item &&
          this.props.item.meta &&
          this.props.item.meta.image &&
          this.props.item.meta.image.url)
      {
        /* Use the fallback series image. */
        return (
          <img
          className={_styles.EpisodeHero}
          src={this.props.item.meta.image.url}
          />
        );
      }

      return null;
    })();

    const summary = (() => {
      console.log(this.props.item);
      if (!this.props.item ||
          !this.props.item.description)
      {
        return 'No description provided.';
      }

      return (
        <p
          className={_styles.Summary}
          dangerouslySetInnerHTML={this.getPreparedHtml(this.props.item.description)}
        >
        </p>
      );
    })();

    return (
      <div className={_styles.PodcastItemPreview}>
        {img}
        {summary}
      </div>
    );
  }
}

export default PodcastItemPreview;