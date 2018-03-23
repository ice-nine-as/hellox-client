import {
  AboutLinkAction,
} from '../Actions/Link/AboutLinkAction';
import {
  ArchivesLinkAction,
} from '../Actions/Link/ArchivesLinkAction';
import {
  createLinkAction,
} from '../Actions/Creators/createLinkAction';
import {
  forumUrl,
} from '../Properties/forumUrl';
import {
  NavLink,
} from 'redux-first-router-link';
import {
  PodcastLinkAction,
} from '../Actions/Link/PodcastLinkAction';
import {
  WriteLinkAction,
} from '../Actions/Link/WriteLinkAction';

import * as React from 'react';

// @ts-ignore
import styles from '../Styles/Components/SiteMap.less';
const _styles = styles || {};

export class SiteMap extends React.PureComponent {
  render() {
    return (
      <div className={_styles.SiteMap}>
        <NavLink
          className={_styles.Link}
          to={createLinkAction(AboutLinkAction)}
        >
          ABOUT
        </NavLink>

        <NavLink
          className={_styles.Link}
          to={createLinkAction(PodcastLinkAction)}
        >
          PODCAST
        </NavLink>

        <NavLink
          className={_styles.Link}
          to={createLinkAction(WriteLinkAction)}
        >
          WRITE
        </NavLink>

        <a
          className={_styles.Link}
          href={forumUrl}
        >
          READ
        </a>

        <NavLink
          className={_styles.Link}
          to={createLinkAction(ArchivesLinkAction)}
        >
          ARCHIVES
        </NavLink>
      </div>
    );
  }
}

export default SiteMap;