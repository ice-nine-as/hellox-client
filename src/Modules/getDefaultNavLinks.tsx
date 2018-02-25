import {
  AboutLinkAction,
} from '../Actions/Link/AboutLinkAction';
import {
  AskLinkAction,
} from '../Actions/Link/AskLinkAction';
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
  ListenLinkAction,
} from '../Actions/Link/ListenLinkAction';
import {
  Logo,
} from '../Components/Logo';
import {
  makeLinkAction,
} from '../Modules/makeLinkAction';
import {
  NavLink,
} from 'redux-first-router-link';
import {
  WriteLinkAction,
} from '../Actions/Link/WriteLinkAction';
import {
  TalkLinkAction,
} from '../Actions/Link/TalkLinkAction';

import * as React from 'react';

// @ts-ignore
import styles from '../Styles/Components/NavBarItem.less';
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
          <Logo />
        </span>
        
        <span className={`${_styles.NavLinkLogoText} NavLinkLogoText`}>
          Hello X
        </span>
      </div>
    </NavLink>,

    <NavLink
      className="NavBarItem"
      to={makeLinkAction(HomeLinkAction)}
      exact={true}
      key={getNewKey()}
    >
      Home
    </NavLink>,

    <NavLink
      className="NavBarItem"
      to={makeLinkAction(WriteLinkAction)}
      key={getNewKey()}
    >
      Write
    </NavLink>,

    <NavLink
      className="NavBarItem"
      to={makeLinkAction(ListenLinkAction)}
      key={getNewKey()}
    >
      Listen
    </NavLink>,

    <NavLink
      className="NavBarItem"
      to={makeLinkAction(TalkLinkAction)}
      key={getNewKey()}
    >
      Talk
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
      to={makeLinkAction(AskLinkAction)}
      key={getNewKey()}
    >
      Ask
    </NavLink>,

    <div
      className="NavBarItem LanguageButtonContainer"
      key={getNewKey()}
    >
      {(Object as any).values(Languages).map((lang: Languages) => {
        if (lang === Languages.Unknown) {
          return null;
        }

        return (
          <ConnectedLanguageButton
            buttonLanguage={lang}
            key={getNewKey()}
          />
        );
      })}
    </div>,
  ]);
}

export default getDefaultNavLinks;