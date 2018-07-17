import {
  getFormattedDate,
} from '../Functions/getFormattedDate';
import {
  isNode,
} from '../Functions/isNode';
import {
  TForumTopicPreviewProps,
} from '../TypeAliases/TForumTopicPreviewProps';

import * as React from 'react';

// @ts-ignore
import _styles from '../Styles/Components/ForumTopicPreview.less';
const styles = _styles || {};

export class ForumTopicPreview extends React.PureComponent<TForumTopicPreviewProps> {
  render() {
    const {
      item,
      maxTitleLength,
    } = this.props;

    const maxTitleLen = maxTitleLength && maxTitleLength > 1 && maxTitleLength % 1 === 0 ?
      maxTitleLength :
      40;

    const randId = Math.round(Math.random() * Math.pow(10, 20)).toString(16);
    if (!isNode()) {
      setTimeout(() => {
        /* Parse the post and extract the image. */
        const frag = document.createDocumentFragment();
        frag.appendChild(document.createElement('div'));
        frag.firstElementChild!.innerHTML = item.description;
        const img = (() => {
          /* Prioritize non-thumbnail images, but fall back to thumbnail images.
           * Do not allow site icons (like Facebook icons). */
          const _userProvidedImg: HTMLImageElement | null =
            frag.querySelector('img:not(.thumbnail):not(.site-icon)');

          return _userProvidedImg || frag.querySelector('img:not(.site-icon)') as HTMLImageElement;
        })();
  
        if (img && img.src) {
          /* Place it in the correct element. */
          const _img = document.getElementById(randId) as HTMLImageElement;
          if (_img) {
            _img.src = img.src;
          }
        } else {
          const _img = document.getElementById(randId);
          if (_img) {
            _img.classList.add('temp');
          }
        }
      });
    }

    const title = (() => {
      const _title: string = (item as any)['rss:title']['#'];
      if (_title.length > maxTitleLen) {
        return _title
          .split(/\s/)
          .filter((aa) => aa)
          .reduce((previous, current) => {
            if (previous.length + 1 + current.length > maxTitleLen - 3) {
              return previous;
            }

            return `${previous} ${current}`;
          }) + '...'; 
      }

      return _title;
    })() || 'No title provided.';

    const author = (() => {
      const _author: string = (item as any)['dc:creator']['#'];
      if (!_author) {
        return null;
      } else if (!/^@/.test(_author)) {
        return _author;
      }

      // @ts-ignore
      return _author.match(/^@[\S]+/)[0];
    })() || 'No name provided';

    const date = new Date(item.pubDate);
    const dateStr = getFormattedDate(date);

    return (
      <div className={styles.ForumTopicPreview}>
        <div className={styles.ForumTopicTeaser}>
          <a
            className={styles.Link}
            href={item.link}>

            <div className={styles.HeroImageContainer}>
              <img
                className={styles.HeroImage}
                id={randId}
                src='data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAzMC4wNiI+PGRlZnM+PHN0eWxlPi5jbHMtMSwuY2xzLTJ7ZmlsbDojZmZmO30uY2xzLTJ7ZmlsbC1ydWxlOmV2ZW5vZGQ7fTwvc3R5bGU+PC9kZWZzPjx0aXRsZT5IZWxsb1hfTWluaV9sb2dvQXJ0Ym9hcmQgMTwvdGl0bGU+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNMTMsMzAsMCwyMi41NHYtMTVMMTMsMCwyNiw3LjUzdjE1Wk0xLjY2LDIxLjU4LDEzLDI4LjEzbDExLjM0LTYuNTVWOC40OEwxMywxLjk0LDEuNjYsOC40OFoiLz48cG9seWdvbiBjbGFzcz0iY2xzLTIiIHBvaW50cz0iMTYuMzIgOC40OCAxMy4yOCAxNC4xNCAxMi43MiAxNC4xNCA5LjY5IDguNDggNy44NiA4LjQ4IDExLjM0IDE0LjggNy42MSAyMS41OCA5LjQ2IDIxLjU4IDEyLjc0IDE1LjQzIDEzLjI0IDE1LjQzIDE2LjU1IDIxLjU4IDE4LjM5IDIxLjU4IDE0LjY0IDE0LjggMTguMTQgOC40OCAxNi4zMiA4LjQ4Ii8+PC9zdmc+'
              />
            </div>

            <div className={styles.Main}>
              <h3 className={styles.Headline}>
                {title}
              </h3>

              <div className={styles.AuthoringInfo}>
                <time className={styles.Date}>{dateStr}</time>
                <span className={styles.Bullet}> · </span>
                <span className={styles.Author}>{author}</span>
              </div>

              <div
                className={styles.Summary}
                dangerouslySetInnerHTML={{ __html: item.description, }}
              ></div>

              <div className={styles.SpacerBar}></div>
            </div>
          </a>
        </div>
      </div>
    );
  }
}

export default ForumTopicPreview;