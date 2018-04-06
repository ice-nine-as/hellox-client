import * as React from 'react';

// @ts-ignore
import styles from '../Styles/Components/ContactForm.less';
const _styles = styles || {};

export class ContactForm extends React.PureComponent {
  render() {
    return (
      <form
        className={_styles.ContactForm}
        action="https://formspree.io/hellox@ice-9.no"
        method="POST"
      >
        <label
          className={`${_styles.Label} ${_styles.Name}`}
          htmlFor={_styles.NameInput}
        >
          Name or alias*
        </label>

        <input
          className={_styles.Input}
          id={_styles.NameInput}
          name="name"
          placeholder="Type here"
          required={true}
          type="text"
        />

        
        <label
          className={`${_styles.Label} ${_styles.ReplyTo}`}
          htmlFor={_styles.ReplyToInput}
        >
          E-mail address
        </label>

        <input
          className={_styles.Input}
          id={_styles.ReplyToInput}
          name="_replyto"
          placeholder="Type here"
          type="email"
        />

        <label
          className={`${_styles.Label} ${_styles.Message}`}
          htmlFor={_styles.MessageInput}
        >
          Your message
        </label>

        <textarea
          className={`${_styles.MessageInput} ${_styles.Input} ${_styles.Textarea}`}
          id={_styles.MessageInput}
          name="message"
          placeholder="Type here"
        />

        <input
          className={`${_styles.CarbonCopy} ${_styles.Input} ${_styles.Checkbox}`}
          id={_styles.CarbonCopy}
          name="CarbonCopy"
          type="checkbox"
        />
        
        <label
          className={`${_styles.CarbonCopyLabel} ${_styles.Label}`}
          htmlFor={_styles.CarbonCopy}
        >
          Send to me by e-mail
        </label>

        <input
          className={`${_styles.Submit} light`}
          type="submit"
          value="SUBMIT"
        />
      </form>
    );
  }
}

export default ContactForm;