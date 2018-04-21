import {
  TStorySubmissionFormProps,
} from '../TypeAliases/TStorySubmissionFormProps';

import * as React from 'react';

// @ts-ignore
import styles from '../Styles/Components/StorySubmissionForm.less';
const _styles = styles || {};

export class StorySubmissionForm extends React.PureComponent<TStorySubmissionFormProps> {
  render() {
    return (
      <form
        action="/story-generator-mailer"
        className={_styles.StorySubmissionForm}
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
          name="replyTo"
          placeholder="Type here"
          type="email"
        />

        <input
          className={`${_styles.CarbonCopy} ${_styles.Input} ${_styles.Checkbox}`}
          id={_styles.CarbonCopy}
          name="carbonCopy"
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
          className={`${_styles.Submit} light`}
          type="submit"
          value="Submit Story"
        />

        <input
          hidden={true}
          name="answers"
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
          name="story"
          type="hidden"
          value={this.props.completedStory}
        />
      </form>
    );
  }
}

export default StorySubmissionForm;