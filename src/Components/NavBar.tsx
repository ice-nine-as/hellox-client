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
  ConnectedHamburgerMenu,
} from './HamburgerMenu';
import {
  forumUrl,
} from '../Properties/forumUrl';
import {
  HomeLinkAction,
} from '../Actions/Link/HomeLinkAction';
import {
  Languages,
} from '../Enums/Languages';
import {
  ConnectedLanguageButton,
} from './LanguageButton';
import {
  Logo,
} from './Logo';
import {
  NavLink,
} from 'redux-first-router-link';
import {
  LogoStates,
} from '../Enums/LogoStates';
import {
  PodcastsLinkAction,
} from '../Actions/Link/PodcastsLinkAction';
import {
  TNavBarProps,
} from '../TypeAliases/TNavBarProps';
import {
  WriteLinkAction,
} from '../Actions/Link/WriteLinkAction';

import * as React from 'react';

// @ts-ignore
import nbStyles from '../Styles/Components/NavBar.less';
const _nbStyles = nbStyles || {};

// @ts-ignore
import nbiStyles from '../Styles/Components/NavBarItem.less';
const _nbiStyles = nbiStyles || {};

let reactKey = 0;

export const navBarItems = Object.freeze([
  <NavLink
    to={createLinkAction(HomeLinkAction)}
    exact={true}
    className={`${_nbiStyles.NavBarItem} ${_nbiStyles.NavLinkHeaderIconLink} NavBarItem`}
    activeClassName="unused"
    key={reactKey += 1}
  >
    <div className={_nbiStyles.NavLinkLogoImageContainer}>
      <Logo state={LogoStates.Small} />
    </div>
  </NavLink>,

  <NavLink
    className={`${_nbiStyles.NavBarItem} NavBarItem`}
    to={createLinkAction(AboutLinkAction)}
    key={reactKey += 1}
  >
    About
  </NavLink>,

  <NavLink
    className={`${_nbiStyles.NavBarItem} NavBarItem`}
    to={createLinkAction(PodcastsLinkAction)}
    key={reactKey += 1}
  >
    Podcasts
  </NavLink>,

  <NavLink
    className={`${_nbiStyles.NavBarItem} NavBarItem`}
    to={createLinkAction(WriteLinkAction)}
    key={reactKey += 1}
  >
    Write
  </NavLink>,

  <a
    className={`${_nbiStyles.NavBarItem} NavBarItem`}
    href={forumUrl}
    key={reactKey += 1}
  >
    Read &amp; Discuss
  </a>,

  <NavLink
    className={`${_nbiStyles.NavBarItem} NavBarItem`}
    to={createLinkAction(ArchivesLinkAction)}
    key={reactKey += 1}
  >
    Archives
  </NavLink>,

  <span
    className={`${_nbiStyles.NavBarItem} NavBarItem LanguageButtonContainer`}
    key={reactKey += 1}
  >
    {(Object as any).values(Languages)
      /* TODO: add Russian language when text is ready. */
      .filter((lang: Languages) => lang !== Languages.Russian)
      .map((lang: Languages) => {
        return (
          <ConnectedLanguageButton
            buttonLanguage={lang}
            className="NavBarItem"
            key={reactKey += 1}
          />
        );
      })}
  </span>
]);

export class NavBar extends React.PureComponent<TNavBarProps> {
  render() {
    return (
      <div className={_nbStyles.NavBar}>
        {/* Visible if the screen is mobile-sized. */}
        <ConnectedHamburgerMenu>{navBarItems}</ConnectedHamburgerMenu>

        {/* Visible if the screen is monitor-sized. */}
        {navBarItems}
      </div>
    );
  }
}
export default NavBar;