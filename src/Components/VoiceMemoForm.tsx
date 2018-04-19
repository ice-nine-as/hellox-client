import * as React from 'react';

// @ts-ignore
import styles from '../Styles/Components/VoiceMemoForm.less';
const _styles = styles || {};

export class VoiceMemoForm extends React.PureComponent {
  render() {
    return (
      <div id={_styles.VoiceMemoForm}>
        <iframe
          src="https://www.speakpipe.com/widget/inline/mvzh4wzb2lvfzokadte7rxqlrg0xicwd"
          // @ts-ignore
          allow="microphone"
          width="100%"
          height="180"
          frameBorder="0"
        >
        </iframe>
        <script
          async={true}
          src="https://www.speakpipe.com/widget/loader.js"
          charSet="utf-8"
        >
        </script>
      </div>
    );
  }
}

export default VoiceMemoForm;