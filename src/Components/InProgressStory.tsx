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
  render() {
    const {
      currentPart,
      language,
      setAnswerText,
      setStoryState,
      storyState,
      storyTemplate,
      templateKey,
    } = this.props;

    let key = -1;

    return (
      <div className={`InProgressStory ${styles.InProgressStory}`}>
        {storyTemplate ?
          storyTemplate.questions.map((question, index) => {
            return (
              <div
                className={styles.QuestionContainer}
                key={key += 1}
              >
                <Question
                  {...question}
                  currentPart={currentPart}
                  language={language}
                  setAnswerText={setAnswerText}
                  storyState={storyState}
                  templateKey={templateKey}
                  current={index + 1}
                  max={storyTemplate!.questions.length}
                />
              </div>
            )
          }) :
          'Loading story...'
        }

        <button
          className={`${styles.Complete} condensed`}
          onClick={() => setStoryState(StoryStates.Complete)}
        >
          GENERATE STORY
        </button>
      </div>
    )
  }
}