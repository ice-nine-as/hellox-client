import {
  TPodcastItemFullProps,
} from '../TypeAliases/TPodcastItemFullProps';

import * as React from 'react';

// @ts-ignore
import styles from '../Styles/Components/PodcastItemFull.less';
const _styles = styles || {};

export class PodcastItemFull extends React.PureComponent<TPodcastItemFullProps> {
  getPreparedHtml(str: string): { __html: string, } {
    return { __html: str, };
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

    const iframe = (() => {
      if (!this.props.item ||
        !this.props.item.enclosures ||
        !this.props.item.enclosures[0] ||
        !this.props.item.enclosures[0].url)
      {
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
          src={`https://player.blubrry.com/?media_url=${encodeURIComponent(correctedUrl)}`}
        ></iframe>
      );
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
      <div className={_styles.PodcastItemFull}>
        {img}
        {iframe}
        {summary}
      </div>
    );
  }
}

export default PodcastItemFull;