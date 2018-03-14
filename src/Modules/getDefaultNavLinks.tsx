import {
  AboutLinkAction,
} from '../Actions/Link/AboutLinkAction';
import {
  FootnotesLinkAction,
} from '../Actions/Link/FootnotesLinkAction';
import {
  HomeLinkAction,
} from '../Actions/Link/HomeLinkAction';
import {
  ConnectedLanguageButton,
} from '../Components/LanguageButton';
import {
  Languages,
} from '../Enums/Languages';
import {
  Logo,
} from '../Components/Logo';
import {
  LogoStates,
} from '../Enums/LogoStates';
import {
  makeLinkAction,
} from '../Modules/makeLinkAction';
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
import styles from '../Styles/Components/NavBarItem.less';
import { forumUrl } from '../Properties/forumUrl';
const _styles = styles || {};

let key = -1;
const getNewKey = () => key += 1;

export function getDefaultNavLinks(): ReadonlyArray<JSX.Element> {
  return Object.freeze([
    <NavLink
      to={makeLinkAction(HomeLinkAction)}
      exact={true}
      className={`${_styles.NavLinkHeaderIconLink} NavBarItem`}
      activeClassName="unused"
      key={getNewKey()}
    >
      <div className={_styles.NavLinkLogoContainer}>
        <span className={_styles.NavLinkLogoImageContainer}>
          <Logo state={LogoStates.Small} />
        </span>
      </div>
    </NavLink>,

    <NavLink
      className="NavBarItem"
      to={makeLinkAction(AboutLinkAction)}
      key={getNewKey()}
    >
      About
    </NavLink>,

    <NavLink
      className="NavBarItem"
      to={makeLinkAction(PodcastLinkAction)}
      key={getNewKey()}
    >
      Podcast
    </NavLink>,

    <NavLink
      className="NavBarItem"
      to={makeLinkAction(WriteLinkAction)}
      key={getNewKey()}
    >
      Write
    </NavLink>,

    <a
      className="NavBarItem"
      href={forumUrl}
      key={getNewKey()}
    >
      Read &amp; Discuss
    </a>,

    <NavLink
      className="NavBarItem"
      to={makeLinkAction(FootnotesLinkAction)}
      key={getNewKey()}
    >
      Footnotes
    </NavLink>,

    <span
      className="NavBarItem LanguageButtonContainer"
      key={getNewKey()}
    >
      {(Object as any).values(Languages).map((lang: Languages) => {
        return (
          <ConnectedLanguageButton
            buttonLanguage={lang}
            key={getNewKey()}
          />
        );
      })}
    </span>,
  ]);
}

export default getDefaultNavLinks;