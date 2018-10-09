import {
  Answer,
} from './Answer';
import {
  IQuestionProps,
} from '../Interfaces/IQuestionProps';
import {
  ProgressWheel,
} from '../Components/ProgressWheel';

import * as React from 'react';

// @ts-ignore
import _styles from '../Styles/Components/Question.less';
const styles = _styles || {};

export class Question extends React.PureComponent<IQuestionProps> {
  render() {
    const {
      answer,
      current,
      currentPart,
      language,
      max,
      setAnswerText,
      storyState,
      templateKey,
      text,
    } = this.props;

    return (
      <div className={`Question ${styles.Question}`}>

        <div className={styles.QuestionWrapper}>
          <ProgressWheel
            current={current}
            max={max}
          />
          <div className={styles.QuestionText}>
            {text}
          </div>
        </div>

        <Answer
          {...answer}
          language={language}
          part={currentPart}
          setAnswerText={setAnswerText}
          storyState={storyState}
          templateKey={templateKey}
        />
      </div>
    );
  }
}