import {
  CompletedStory,
} from './CompletedStory';
import {
  CurrentPartAction,
} from '../Actions/CurrentPartAction';
import {
  getStoryTemplate,
} from '../Modules/getStoryTemplate';
import {
  InProgressStory,
} from './InProgressStory';
import {
  // @ts-ignore
  IStoryTemplate,
} from '../Interfaces/IStoryTemplate';
import {
  IStoryGeneratorAction,
} from '../Actions/IStoryGeneratorAction';
import {
  Languages,
} from '../../Enums/Languages';
import {
  makeStoryGeneratorAction,
} from '../Modules/makeStoryGeneratorAction';
import {
  connect,
  MapDispatchToProps,
  MapStateToProps,
} from 'react-redux';
import {
  Dispatch,
} from 'redux';
import {
  AnswerTextAction,
} from '../Actions/AnswerTextAction';
import {
  StoryStateAction,
} from '../Actions/StoryStateAction';
import {
  StoryGeneratorParts,
} from '../Enums/StoryGeneratorParts';
import {
  StoryGeneratorTemplateKeys,
} from '../Enums/StoryGeneratorTemplateKeys';
import {
  StoryStates,
} from '../Enums/StoryStates';
import {
  TStoryGeneratorDispatchProps,
} from '../TypeAliases/TStoryGeneratorDispatchProps';
import {
  TStoryGeneratorStoreProps,
} from '../TypeAliases/TStoryGeneratorStoreProps';

import * as React from 'react';

// @ts-ignore
import styles from '../Styles/Components/StoryGenerator.less';
const _styles = styles || {};

export class StoryGenerator extends React.PureComponent<TStoryGeneratorStoreProps & TStoryGeneratorDispatchProps> {
  render() {
    const {
      currentPart,
      language,
      storyTemplates,
    } = this.props;

    const {
      key,
      template,
    } = getStoryTemplate({
      currentPart,
      language,
      storyTemplates,
    });

    if (!key || !template) {
      return 'Now loading...';
    }

    return (
      <div className={`StoryGenerator ${_styles.StoryGenerator}`}>
        {this.props.storyState === StoryStates.Complete ?
          <CompletedStory
            setCurrentPart={this.props.setCurrentPart}
            setStoryState={this.props.setStoryState}
            storyTemplate={template}
          /> :
          <InProgressStory
            currentPart={this.props.currentPart}
            language={this.props.language}
            setAnswerText={this.props.setAnswerText}
            setStoryState={this.props.setStoryState}
            storyTemplate={template}
            templateKey={key}
          />}
      </div>
    );
  }
}

export const mapStateToProps: MapStateToProps<
  TStoryGeneratorStoreProps,
  {},
  {
    language:       Languages,
    storyGenerator: TStoryGeneratorStoreProps,
  }
> = ({
  language,
  storyGenerator: {
    currentPart,
    storyTemplates,
    storyState,
  },
}) => ({
  currentPart,
  language,
  storyTemplates,
  storyState,
});

export const mapDispatchToProps: MapDispatchToProps<TStoryGeneratorDispatchProps, TStoryGeneratorStoreProps> = (dispatch: Dispatch<IStoryGeneratorAction>) => ({
  setAnswerText(value: string, templateKey: StoryGeneratorTemplateKeys, id: string) {
    const action = makeStoryGeneratorAction({
      action: AnswerTextAction,
      id,
      templateKey,
      value,
    });

    return dispatch(action);
  },

  setCurrentPart(value: StoryGeneratorParts, templateKey: StoryGeneratorTemplateKeys) {
    const action = makeStoryGeneratorAction({
      action: CurrentPartAction,
      templateKey,
      value,
    });

    return dispatch(action);
  },

  setStoryState(value: StoryStates) {
    const action = makeStoryGeneratorAction({
      action: StoryStateAction,
      value,
    });

    return dispatch(action);
  },
});

export const ConnectedStoryGenerator = connect(mapStateToProps, mapDispatchToProps)(StoryGenerator);

export default StoryGenerator;