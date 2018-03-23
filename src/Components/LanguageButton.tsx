import {
  createLanguageAction,
} from '../Actions/Creators/createLanguageAction';
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
import {
  TStoreProps,
} from '../TypeAliases/TStoreProps';

import * as React from 'react';

// @ts-ignore
import styles from '../Styles/Components/LanguageButton.less';
const _styles = styles || {};

export class LanguageButton extends React.PureComponent<TLanguageButtonOwnProps & TLanguageButtonDispatchProps> {
  render() {
    return (
      <button
        className={`${_styles.LanguageButton}${this.props.active ? ' ' + _styles.Active : ''}`}
        onClick={() => this.props.switchLanguage(this.props.buttonLanguage)}
      >
        {this.props.buttonLanguage[0].toUpperCase() + this.props.buttonLanguage.slice(1)}
      </button>
    );
  }
}

export const mapStateToProps = ({
  language,
}: TStoreProps, {
  buttonLanguage,
}: {
  buttonLanguage: Languages,
}): TLanguageButtonOwnProps => ({
  active: language === buttonLanguage,
  buttonLanguage,
});

export const mapDispatchToProps = (dispatch: Dispatch<{}>): TLanguageButtonDispatchProps => ({
  switchLanguage(lang: Languages): IAppAction {
    return dispatch(createLanguageAction(LanguageAction, lang));
  },
});

export const ConnectedLanguageButton =
  connect(mapStateToProps, mapDispatchToProps)(LanguageButton);

export default LanguageButton;