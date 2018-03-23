import * as React from 'react';

// @ts-ignore
import styles from '../Styles/Components/ContactForm.less';
const _styles = styles || {};

export class ContactForm extends React.PureComponent {
  render() {
    return (
      <form
        className={_styles.ContactForm}
        action="https://formspree.io/christine@ice-9.no"
        method="POST"
      >
        <label
          className={`${_styles.NameLabel} ${_styles.Label}`}
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
          className={`${_styles.ReplyToLabel} ${_styles.Label}`}
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
          className={`${_styles.MessageLabel} ${_styles.Label}`}
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
          className={`${_styles.Submit} condensed`}
          type="submit"
          value="SUBMIT"
        />
      </form>
    );
  }
}

export default ContactForm;