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
  TLanguageButtonStoreProps,
} from '../TypeAliases/TLanguageButtonStoreProps';
import {
  TStoreProps,
} from '../TypeAliases/TStoreProps';

import * as React from 'react';

// @ts-ignore
import styles from '../Styles/Components/LanguageButton.less';
const _styles = styles || {};

export class LanguageButton extends React.PureComponent<TLanguageButtonOwnProps & TLanguageButtonStoreProps & TLanguageButtonDispatchProps> {
  render() {
    const languageClass = _styles[this.props.language] ?
      _styles[this.props.language] :
      '';

    const activeClass = this.props.active ?
      ` ${_styles.Active}` :
      '';

    const capitalizedButtonLanguage =
      this.props.buttonLanguage[0].toUpperCase() +
      this.props.buttonLanguage.slice(1);
    return (
      <button
        className={`${_styles.LanguageButton} ${languageClass}${activeClass}`}
        onClick={() => this.props.switchLanguage(this.props.buttonLanguage)}
      >
        {capitalizedButtonLanguage}
      </button>
    );
  }
}

export const mapStateToProps = ({
  language,
}: TStoreProps, {
  buttonLanguage,
  className,
}: TLanguageButtonOwnProps): TLanguageButtonOwnProps & TLanguageButtonStoreProps =>
({
  active: language === buttonLanguage,
  buttonLanguage,
  className,
  language,
});

export const mapDispatchToProps = (dispatch: Dispatch<{}>): TLanguageButtonDispatchProps => ({
  switchLanguage(lang: Languages): IAppAction {
    return dispatch(createLanguageAction(LanguageAction, lang));
  },
});

export const ConnectedLanguageButton =
  connect(mapStateToProps, mapDispatchToProps)(LanguageButton);

export default LanguageButton;