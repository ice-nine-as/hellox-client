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
import _styles from '../Styles/Components/Answer.less';
const styles = _styles || {};

export class Answer extends React.PureComponent<IAnswerProps> {
  render() {
    const {
      id,
      selectOptions,
      setAnswerText,
      storyState,
      templateKey,
      text,
      type,
    } = this.props;

    const element = (() => {
      const props: { [key: string]: any } = {
        className:    styles.AnswerInput,
        defaultValue: text,
        placeholder:  'Click to type',
        required:     true,
      };

      if (storyState === StoryStates.Complete) {
        /* Do not allow the answers to be changed after the story is marked
        * Complete. */
        props.readOnly = true;
      }

      const changerFunc = (e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setAnswerText(
          e.currentTarget.value,
          templateKey,
          id);
      };

      if (type === AnswerTypes.Select) {
        props.onChange = changerFunc;

        let key = -1;
        return (
          <select {...props}>
            {selectOptions.map((selection) => (
              <option key={key += 1}>{selection}</option>
            ))}
          </select>
        );
      }

      props.onKeyUp = changerFunc;

      if (type === AnswerTypes.Big) {
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
      <div className={`Answer ${styles.Answer}`}>
        {element}
      </div>
    );
  }
}

export default Answer;