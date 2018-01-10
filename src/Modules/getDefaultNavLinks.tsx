import {
  AboutLinkAction,
} from '../Actions/Link/AboutLinkAction';
import {
  AskLinkAction,
} from '../Actions/Link/AskLinkAction';
import {
  HeaderIcon,
} from '../Components/HeaderIcon';
import {
  headerIconPath,
} from '../Properties/headerIconPath';
import {
  HomeLinkAction,
} from '../Actions/Link/HomeLinkAction';
import {
  ListenLinkAction,
} from '../Actions/Link/ListenLinkAction';
import {
  makeLinkAction,
} from '../Modules/makeLinkAction';
import {
  NavLink,
} from 'redux-first-router-link';
import {
  ReadWriteLinkAction,
} from '../Actions/Link/ReadWriteLinkAction';
import {
  TalkLinkAction,
} from '../Actions/Link/TalkLinkAction';

import * as React from 'react';

let key = -1;
function getNewKey() {
  return key += 1;
}

export function getDefaultNavLinks(): Array<JSX.Element> {
  return [
    <NavLink
      to={makeLinkAction(HomeLinkAction)}
      exact={true}
      className="HeaderIconLink"
      activeClassName="unused"
      key={getNewKey()}
    >
      <HeaderIcon url={headerIconPath} />
    </NavLink>,

    <NavLink
      to={makeLinkAction(HomeLinkAction)}
      exact={true}
      key={getNewKey()}
    >
      Home
    </NavLink>,

    <NavLink
      to={makeLinkAction(ReadWriteLinkAction)}
      key={getNewKey()}
    >
      Read/Write
    </NavLink>,

    <NavLink
      to={makeLinkAction(ListenLinkAction)}
      key={getNewKey()}
    >
      Listen
    </NavLink>,

    <NavLink
      to={makeLinkAction(TalkLinkAction)}
      key={getNewKey()}
    >
      Talk
    </NavLink>,

    <NavLink
      to={makeLinkAction(AboutLinkAction)}
      key={getNewKey()}
    >
      About
    </NavLink>,

    <NavLink
      to={makeLinkAction(AskLinkAction)}
      key={getNewKey()}
    >
      Ask
    </NavLink>,
  ];
}

export default getDefaultNavLinks;