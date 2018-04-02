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
      <div className={`CompletedStory ${_styles.CompletedStory}`}>
        <textarea
          className={`CompletedStoryTextArea ${_styles.CompletedStoryTextArea}`}
          defaultValue={storyText} />

        <button className={`CompletedStorySubmitButton ${_styles.CompletedStoryTextArea}`}>
          Submit My Story
        </button>
      </div>
    );
  }
}

export default CompletedStory;