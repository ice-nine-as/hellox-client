import {
  TStorySubmissionFormProps,
} from '../TypeAliases/TStorySubmissionFormProps';

import * as React from 'react';

// @ts-ignore
import styles from '../Styles/Components/StorySubmissionForm.less';
const _styles = styles || {};

export class StorySubmissionForm extends React.PureComponent<TStorySubmissionFormProps> {
  carbonCopy: HTMLInputElement | null = null;
  email: HTMLInputElement | null = null;
  form: HTMLFormElement | null = null;

  constructor(props: any, context?: any) {
    super(props, context);

    this.submit = this.submit.bind(this);
  }

  render() {
    return (
      <form
        action="https://formspree.io/hellox@ice-9.no"
        className={_styles.StorySubmissionForm}
        ref={(ref) => this.form = ref}
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
          ref={(ref) => this.email = ref}
          type="email"
        />

        <input
          className={`${_styles.CarbonCopy} ${_styles.Input} ${_styles.Checkbox}`}
          id={_styles.CarbonCopy}
          name="CarbonCopy"
          ref={(ref) => this.carbonCopy = ref}
          type="checkbox"
        />
        <label
          className={`${_styles.CarbonCopyLabel} ${_styles.Label}`}
          htmlFor={_styles.CarbonCopy}
        >
          <div className={`${_styles.LabelBoxWrapper}`}>
            <div className={`${_styles.LabelBox}`}>
              <p>✓</p>
            </div>
          </div>
          Send to me by e-mail
        </label>

        <input
          className={`${_styles.Submit} condensed`}
          onClick={this.submit}
          type="submit"
          value="Submit Story"
        />

        <input
          hidden={true}
          name="_language"
          type="hidden"
          value={this.props.language}
        />

        <input
          hidden={true}
          name="Answers"
          type="hidden"
          value={JSON.stringify(this.props.storyTemplate.questions.map<{ id: string, text: string, }>((question) => {
            const {
              id,
              text,
            } = question.answer;

            return {
              id,
              text,
            };
          }))}
        />

        <input
          hidden={true}
          name="Story"
          type="hidden"
          value={this.props.completedStory}
        />
      </form>
    );
  }

  submit() {
    if (this.carbonCopy &&
      this.carbonCopy.checked &&
      this.email &&
      this.email.value &&
      this.form) {
      /* Insert CC data for formspree. */
      const ccInput = document.createElement('input');
      ccInput.hidden = true;
      ccInput.name = '_cc';
      ccInput.type = 'hidden';
      ccInput.value = this.email.value;
      this.form.appendChild(ccInput);
    }
  }
}

export default StorySubmissionForm;