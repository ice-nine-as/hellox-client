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
    const iframe = (() => {
      if (!this.props.item ||
        !this.props.item.enclosures ||
        !this.props.item.enclosures[0] ||
        !this.props.item.enclosures[0].url) {
        return 'Embed failed.';
      }

      const correctedUrl =
        /* Add https. */
        'https' +
        (this.props.item.enclosures[0].url
          /* Remove http. */
          .slice(4));

      return (
        <iframe
          className={_styles.PodcastIframe}
          scrolling="no"
          src={`https://player.blubrry.com/?media_url=${encodeURIComponent(correctedUrl)}`}
        ></iframe>
      );
    })();

    const summary = (() => {
      console.log(this.props.item);
      if (!this.props.item ||
        !this.props.item.description) {
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

    const title = (() => {
      console.log(this.props.item);
      if (!this.props.item ||
        !this.props.item.title) {
        return 'No Title provided.';
      }

      return (
        <h3
          className={_styles.Title}
          dangerouslySetInnerHTML={this.getPreparedHtml(this.props.item.title)}
        >
        </h3>
      );
    })();

    return (
      <div className={_styles.PodcastItemPreview}>
        <div
          className={_styles.ImageWrapper}
          style={{ backgroundImage: `url('${this.props.item['itunes:image']['#']}')` }}>
        </div>
        <div className={_styles.TextContent}>
          {iframe}
          {title}
          {summary}
        </div>
      </div>
    );
  }
}

export default PodcastItemPreview;