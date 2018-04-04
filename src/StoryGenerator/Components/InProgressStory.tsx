import {
  ProgressWheel,
} from '../../Components/ProgressWheel';
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
import styles from '../Styles/Components/InProgressStory.less';
const _styles = styles || {};

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
      <div className={`InProgressStory ${_styles.InProgressStory}`}>
        {this.props.storyTemplate ?
          this.props.storyTemplate.questions.map((question, index) => {
            return (
              <div
                className={_styles.QuestionContainer}
                key={key += 1}
              >
                <ProgressWheel
                  current={index + 1}
                  max={this.props.storyTemplate!.questions.length}
                />

                <Question
                  {...question}
                  currentPart={this.props.currentPart}
                  language={this.props.language}
                  setAnswerText={this.props.setAnswerText}
                  storyState={this.props.storyState}
                  templateKey={this.props.templateKey}
                />
              </div>
            )
          }) :
          'Loading story...'
        }

        <button
          className={`${_styles.Complete} condensed`}
          onClick={this.complete}
        >
          Generate Story
        </button>
      </div>
    )
  }

  complete() {
    this.props.setStoryState(StoryStates.Complete);
  }
}