import {
  IAppAction,
} from '../Actions/App/IAppAction';
import {
  LanguageAction,
} from '../Actions/App/LanguageAction';
import {
  Languages,
} from '../Enums/Languages';
import {
  makeLanguageAction,
} from '../Modules/makeLanguageAction';
import {
  connect,
} from 'react-redux';
import {
  Dispatch,
} from 'redux';
import {
  TLanguageButtonDispatchProps,
} from '../TypeAliases/TLanguageButtonDispatchProps';
import {
  TLanguageButtonOwnProps,
} from '../TypeAliases/TLanguageButtonOwnProps';

import * as React from 'react';

// @ts-ignore
import styles from '../Styles/Components/LanguageButton.less';
const _styles = styles || {};

export class LanguageButton extends React.PureComponent<TLanguageButtonOwnProps & TLanguageButtonDispatchProps> {
  render() {
    return (
      <button
        className={_styles.LanguageButton}
        onClick={() => this.props.switchLanguage(this.props.buttonLanguage)}
      >
        {this.props.buttonLanguage}
      </button>
    );
  }
}

export const mapDispatchToProps = (dispatch: Dispatch<{}>): TLanguageButtonDispatchProps => ({
  switchLanguage(lang: Languages): IAppAction {
    return dispatch(makeLanguageAction(LanguageAction, lang));
  },
});

export const ConnectedLanguageButton =
  connect(null, mapDispatchToProps)(LanguageButton);

export default LanguageButton;