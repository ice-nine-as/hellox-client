import {
  Answer,
} from './Answer';
import {
  IQuestionProps,
} from '../Interfaces/IQuestionProps';
import {
  ProgressWheel,
} from '../../Components/ProgressWheel';

import * as React from 'react';

// @ts-ignore
import _styles from '../Styles/Components/Question.less';
const styles = _styles || {};


export class Question extends React.PureComponent<IQuestionProps> {
  render() {
    return (
      <div className={`Question ${styles.Question}`}>

        <div className={styles.QuestionWrapper}>
          <ProgressWheel
            current={this.props.current}
            max={this.props.max}
          />
          <div className={styles.QuestionText}>
            {this.props.text}
          </div>
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