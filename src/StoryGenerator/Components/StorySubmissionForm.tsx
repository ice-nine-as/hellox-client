import {
  TStorySubmissionFormProps,
} from '../TypeAliases/TStorySubmissionFormProps';

import * as React from 'react';

// @ts-ignore
import _styles from '../Styles/Components/StorySubmissionForm.less';
const styles = _styles || {};

export class StorySubmissionForm extends React.PureComponent<TStorySubmissionFormProps> {
  render() {
    const {
      completedStory,
      storyTemplate,
    } = this.props;

    return (
      <form
        action="/story-generator-mailer"
        className={styles.StorySubmissionForm}
        method="POST"
      >
        <label
          className={`${styles.NameLabel} ${styles.Label}`}
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
          className={`${styles.ReplyToLabel} ${styles.Label}`}
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

        <input
          className={`${styles.CarbonCopy} ${styles.Input} ${styles.Checkbox}`}
          id={styles.CarbonCopy}
          name="carbonCopy"
          type="checkbox"
        />

        <label
          className={`${styles.CarbonCopyLabel} ${styles.Label}`}
          htmlFor={styles.CarbonCopy}
        >
          <div className={`${styles.LabelBoxWrapper}`}>
            <div className={`${styles.LabelBox}`}>
              <p>✓</p>
            </div>
          </div>

          Send to me by e-mail
        </label>

        <input
          className={`${styles.Submit} light`}
          type="submit"
          value="Submit Story"
        />

        <input
          hidden={true}
          name="responses"
          type="hidden"
          value={storyTemplate.questions.map((question) => (
            `[${question.answer.id}] ${question.text}: ${question.answer.text}`
          )).join('\n')}
        />

        <input
          hidden={true}
          name="story"
          type="hidden"
          value={completedStory}
        />
      </form>
    );
  }
}

export default StorySubmissionForm;