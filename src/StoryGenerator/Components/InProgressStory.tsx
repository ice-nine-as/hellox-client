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
  render() {
    let key = -1;

    return (
      <div className={`InProgressStory ${_styles.InProgressStory}`}>
        {this.props.storyTemplate ?
          this.props.storyTemplate.questions.map((question) => {
            return (
              <Question
                {...question}
                currentPart={this.props.currentPart}
                language={this.props.language}
                setAnswerText={this.props.setAnswerText}
                templateKey={this.props.templateKey}
                key={key += 1}
              />
            )
          }) :
          'Loading story...'
        }

        <button
          className={`InProgressStoryComplete ${_styles.InProgressStoryComplete}`}
          onClick={() => this.props.setStoryState(StoryStates.Complete)}>
          Complete Story
        </button>
      </div>
    )
  }
}