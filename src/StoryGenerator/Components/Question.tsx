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
        {this.props.text}
        {Array.isArray(this.props.answer) ?
          this.props.answer.map((model, index) => {
            return (
              <Answer
                {...model}
                key={index}
                setAnswerText={this.props.setAnswerText} />
            );
          }) :
          <Answer
            {...this.props.answer}
            language={this.props.language}
            part={this.props.currentPart}
            setAnswerText={this.props.setAnswerText}
            templateKey={this.props.templateKey}
          />}
      </div>
    );
  }
}