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
import styles from '../Styles/Components/CompletedStory.less';
const _styles = styles || {};

export class CompletedStory extends React.PureComponent<TCompletedStoryProps> {
  render() {
    const storyText = this.props.storyTemplate === null ?
      'Sorry, there\'s been an error.' :
      new StoryTemplate(this.props.storyTemplate).getCompleteStory();

    return (
      <div className={_styles.CompletedStory}>
        <textarea
          className={_styles.Editor}
          defaultValue={storyText}
        />

        <p className={_styles.Explainer}>
          Fill out the fields below and click the Submit My Story button
          in order to send your customized, personal story to the Ice 9 team!
          Include your e-mail address to get a copy sent to you. Please carefully
          note that by sending in a submission, you grant Ice-9 AS the permanent
          right to use that submission in future stories, podcasts, promotional
          materials, etc. 
        </p>

        <StorySubmissionForm
          completedStory={storyText}
          language={this.props.language}
          storyTemplate={this.props.storyTemplate}
        />
      </div>
    );
  }
}

export default CompletedStory;