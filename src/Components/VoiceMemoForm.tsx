import * as React from 'react';

// @ts-ignore
import styles from '../Styles/Components/VoiceMemoForm.less';
const _styles = styles || {};

export class VoiceMemoForm extends React.PureComponent {
  render() {
    return (
      <div id={_styles.VoiceMemoForm}>
        <script
          id="sayquick_embedded_widget_2kxqn5xw"
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `(function(d) {
              var t = 'script',
                ul = d.createElement(t),
                s = d.getElementsByTagName(t)[0];
              ul.async = true;
              ul.src = "https://sayquick.com/widgets/embedded/2kxqn5xw.js";
              s.parentNode.insertBefore(ul, s);
            })(document);`
          }}>
        </script>
      </div>
    );
  }
}

export default VoiceMemoForm;