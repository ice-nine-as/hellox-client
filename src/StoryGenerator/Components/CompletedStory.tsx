import {
  StorySubmissionForm,
} from './StorySubmissionForm';
import {
  StoryTemplate,
} from '../Objects/StoryTemplate';
import {
  TCompletedStoryProps,
} from '../TypeAliases/TCompletedStoryProps';

import * as React from 'react';

// @ts-ignore
import _styles from '../Styles/Components/CompletedStory.less';
const styles = _styles || {};

export class CompletedStory extends React.PureComponent<TCompletedStoryProps, { editedText: string | null, }> {
  state = { editedText: null, };

  render() {
    const {
      language,
      storyTemplate,
    } = this.props;

    const {
      editedText,
    } = this.state;

    const storyText = (() => {
      if (typeof editedText === 'string') {
        return editedText;
      } else if (storyTemplate === null) {
        return 'Sorry, there\'s been an error.';
      } else {
        return new StoryTemplate(storyTemplate).getCompleteStory();
      }
    })();

    return (
      <div className={styles.CompletedStory}>
        <div className={styles.Instructions}>
          <p className={styles.InstructionText}>
            Here is your story scene. Feel free to edit and add to this text
            in any way you like.
          </p>
        </div>

        <div className={styles.EditorWrapper}>
          <textarea
            className={`${styles.Editor} light`}
            onChange={(e) => {
              this.setState({
                editedText: e.currentTarget.value,
              });
            }}

            value={storyText}
          />
        </div>

        <div className={styles.formWrapper}>
          <p>
            Fill out the fields below and click the Submit My Story button
            in order to send your customized, personal story to the Ice 9 team!
            Include your e-mail address to get a copy sent to you.
          </p>

          <p>
            Please carefully
            note that by sending in a submission, you grant Ice-9 AS the permanent
            right to use that submission in future stories, podcasts, promotional
            materials, etc.
          </p>

          <StorySubmissionForm
            completedStory={storyText}
            language={language}
            storyTemplate={storyTemplate}
          />
        </div>
      </div>
    );
  }
}

export default CompletedStory;