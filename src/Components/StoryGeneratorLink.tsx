import {
  makeLinkAction,
} from '../Modules/makeLinkAction';
import {
  NavLink,
} from 'redux-first-router-link';
import {
  StoryGeneratorLogo,
} from '../Components/StoryGeneratorLogo';
import {
  TStoryGeneratorLinkProps,
} from '../TypeAliases/TStoryGeneratorLinkProps';
import {
  WriteLinkAction,
} from '../Actions/Link/WriteLinkAction';

import * as React from 'react';

// @ts-ignore
import styles from '../Styles/Components/StoryGeneratorLink.less';
const _styles = styles || {};

export class StoryGeneratorLink extends React.PureComponent<TStoryGeneratorLinkProps> {
  render() {
    return (
      <NavLink
        className={_styles.StoryGeneratorLink}
        to={makeLinkAction(WriteLinkAction)}>
        <StoryGeneratorLogo />
      </NavLink>
    );
  }
}

export default StoryGeneratorLink;