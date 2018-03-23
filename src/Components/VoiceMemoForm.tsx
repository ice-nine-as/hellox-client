import * as React from 'react';

// @ts-ignore
import styles from '../Styles/Components/VoiceMemoForm.less';
const _styles = styles || {};

export class VoiceMemoForm extends React.PureComponent {
  render() {
    return (
      <div id={_styles.VoiceMemoForm}>
        Voice memo goes here.
      </div>
    );
  }
}

export default VoiceMemoForm;