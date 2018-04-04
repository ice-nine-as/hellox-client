import {
  Answer,
} from './Answer';
import {
  IQuestionProps,
} from '../Interfaces/IQuestionProps';

import * as React from 'react';

// @ts-ignore
import styles from '../Styles/Components/Question.less';
const _styles = styles || {};


export class Question extends React.PureComponent<IQuestionProps> {
  render() {
    return (
      <div className={`Question ${_styles.Question}`}>
        <div className={_styles.QuestionText}>
          {this.props.text}
        </div>

        <Answer
          {...this.props.answer}
          language={this.props.language}
          part={this.props.currentPart}
          setAnswerText={this.props.setAnswerText}
          storyState={this.props.storyState}
          templateKey={this.props.templateKey}
        />
      </div>
    );
  }
}