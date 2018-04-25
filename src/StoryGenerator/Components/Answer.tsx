import {
  AnswerTypes,
} from '../Enums/AnswerTypes';
import {
  IAnswerProps,
} from '../Interfaces/IAnswerProps';
import {
  StoryStates,
} from '../Enums/StoryStates';

import * as React from 'react';

// @ts-ignore
import styles from '../Styles/Components/Answer.less';
const _styles = styles || {};

export class Answer extends React.PureComponent<IAnswerProps> {
  render() {
    const element = (() => {
      const props: { [key: string]: any } = {
        className:    _styles.AnswerInput,
        defaultValue: this.props.text,
        placeholder:  'Click to type',
        required:     true,
      };

      if (this.props.storyState === StoryStates.Complete) {
        /* Do not allow the answers to be changed after the story is marked
        * Complete. */
        props.readOnly = true;
      }

      /* Typescript compiler uses `_this` internally, so __this it is. */
      const __this = this;
      const changerFunc = (e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        __this.props.setAnswerText(
          e.currentTarget.value,
          __this.props.templateKey,
          __this.props.id);
      };

      if (this.props.type === AnswerTypes.Select) {
        props.onChange = changerFunc;

        let key = -1;
        return (
          <select {...props}>
            {this.props.selectOptions.map((selection) => (
              <option key={key += 1}>{selection}</option>
            ))}
          </select>
        );
      }

      props.onKeyUp = changerFunc;

      if (this.props.type === AnswerTypes.Big) {
        return (
          <textarea {...props} />
        );
      } else {
        return (
          <input {...props} />
        );
      }
    })();

    return (
      <div className={`Answer ${_styles.Answer}`}>
        {element}
      </div>
    );
  }
}

export default Answer;