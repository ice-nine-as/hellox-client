import {
  Question,
} from './Question';
import {
  StoryStates,
} from '../Enums/StoryStates';
import {
  TInProgressStoryProps,
} from '../TypeAliases/TInProgressStoryProps';

import * as React from 'react';

// @ts-ignore
import _styles from '../Styles/Components/InProgressStory.less';
const styles = _styles || {};

export const strings = {
  CHILD_INVALID:
    'One of the children passed to the Story component was not a string, ' +
    'number, or an instance of the Question component.',
};

export class InProgressStory extends React.PureComponent<TInProgressStoryProps> {
  constructor(props: any, context?: any) {
    super(props, context);

    this.complete = this.complete.bind(this);
  }

  render() {
    let key = -1;

    return (
      <div className={`InProgressStory ${styles.InProgressStory}`}>
        {this.props.storyTemplate ?
          this.props.storyTemplate.questions.map((question, index) => {
            return (
              <div
                className={styles.QuestionContainer}
                key={key += 1}
              >
                <Question
                  {...question}
                  currentPart={this.props.currentPart}
                  language={this.props.language}
                  setAnswerText={this.props.setAnswerText}
                  storyState={this.props.storyState}
                  templateKey={this.props.templateKey}
                  current={index + 1}
                  max={this.props.storyTemplate!.questions.length}
                />
              </div>
            )
          }) :
          'Loading story...'
        }

        <button
          className={`${styles.Complete} condensed`}
          onClick={this.complete}
        >
          GENERATE STORY
        </button>
      </div>
    )
  }

  complete() {
    this.props.setStoryState(StoryStates.Complete);
  }
}