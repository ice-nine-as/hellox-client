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
  ExternalPageUrls,
} from '../Enums/ExternalPageUrls';
import {
  NavLink,
} from 'redux-first-router-link';
import {
  PodcastsLinkAction,
} from '../Actions/Link/PodcastsLinkAction';
import {
  WriteLinkAction,
} from '../Actions/Link/WriteLinkAction';

import * as React from 'react';

// @ts-ignore
import _styles from '../Styles/Components/SiteMap.less';
const styles = _styles || {};

export class SiteMap extends React.PureComponent {
  render() {
    return (
      <div className={styles.SiteMap}>
        <NavLink
          className={styles.Link}
          to={createLinkAction(AboutLinkAction)}
        >
          ABOUT
        </NavLink>

        <br />

        <NavLink
          className={styles.Link}
          to={createLinkAction(PodcastsLinkAction)}
        >
          PODCASTS
        </NavLink>

        <br />

        <NavLink
          className={styles.Link}
          to={createLinkAction(WriteLinkAction)}
        >
          WRITE
        </NavLink>

        <br />

        <a
          className={styles.Link}
          href={ExternalPageUrls.Forum}
        >
          READ
        </a>

        <br />

        <NavLink
          className={styles.Link}
          to={createLinkAction(ArchivesLinkAction)}
        >
          ARCHIVES
        </NavLink>
      </div>
    );
  }
}

export default SiteMap;