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
  Dispatch, AnyAction,
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
import _styles from '../Styles/Components/LanguageButton.less';
const styles = _styles || {};

export class LanguageButton extends React.PureComponent<TLanguageButtonOwnProps & TLanguageButtonStoreProps & TLanguageButtonDispatchProps> {
  render() {
    const languageClass = styles[this.props.language] ?
      styles[this.props.language] :
      '';

    const activeClass = this.props.active ?
      ` ${styles.Active} active` :
      '';

    const capitalizedButtonLanguage =
      this.props.buttonLanguage[0].toUpperCase() +
      this.props.buttonLanguage.slice(1);

    const userClass =
      this.props.className ?
        ` ${this.props.className}` :
        '';
    return (
      <button
        className={`${styles.LanguageButton} ${languageClass}${activeClass}${userClass}`}
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

export const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): TLanguageButtonDispatchProps => ({
  switchLanguage(lang: Languages): IAppAction {
    return dispatch(createLanguageAction(LanguageAction, lang));
  },
});

export const ConnectedLanguageButton =
  connect(mapStateToProps, mapDispatchToProps)(LanguageButton);

export default LanguageButton;