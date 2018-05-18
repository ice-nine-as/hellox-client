import * as React from 'react';

// @ts-ignore
import _styles from '../Styles/Components/ContactForm.less';
const styles = _styles || {};

export class ContactForm extends React.PureComponent {
  render() {
    return (
      <form
        className={styles.ContactForm}
        action="https://formspree.io/helloX@ice-9.no"
        method="POST"
      >
        <label
          className={`${styles.Label} ${styles.Name}`}
          htmlFor={styles.NameInput}
        >
          Name or alias*
        </label>

        <input
          className={styles.Input}
          id={styles.NameInput}
          name="name"
          placeholder="Type here"
          required={true}
          type="text"
        />

        <label
          className={`${styles.Label} ${styles.ReplyTo}`}
          htmlFor={styles.ReplyToInput}
        >
          E-mail address
        </label>

        <input
          className={styles.Input}
          id={styles.ReplyToInput}
          name="email"
          placeholder="Type here"
          type="email"
        />

        <label
          className={`${styles.Label} ${styles.Message}`}
          htmlFor={styles.MessageInput}
        >
          Your message
        </label>

        <textarea
          className={`${styles.MessageInput} ${styles.Input} ${styles.Textarea}`}
          id={styles.MessageInput}
          name="message"
          placeholder="Type here"
        />

        <input
          className={`${styles.Submit} light`}
          type="submit"
          value="SUBMIT"
        />
      </form>
    );
  }
}

export default ContactForm;