import {
  AnswerTextAction,
} from '../Actions/AnswerTextAction';
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
/*import {
  // @ts-ignore
  IStoryTemplate,
} from '../Interfaces/IStoryTemplate';*/
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
  StoryPartSelector,
} from './StoryPartSelector';
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

    const titleMap = {} as {
      [StoryGeneratorParts.A]: string,
      [StoryGeneratorParts.B]: string,
      [StoryGeneratorParts.C]: string,
    };

    let titleKey = getStoryTemplate({
      currentPart: StoryGeneratorParts.A,
      language,
      storyTemplates,
    }).key;

    if (titleKey && storyTemplates[titleKey]) {
      // @ts-ignore
      titleMap[StoryGeneratorParts.A] = storyTemplates[titleKey].title;
    } else {
      titleMap[StoryGeneratorParts.A] = 'Part A';
    }

    titleKey = getStoryTemplate({
      currentPart: StoryGeneratorParts.B,
      language,
      storyTemplates,
    }).key;

    if (titleKey && storyTemplates[titleKey]) {
      // @ts-ignore
      titleMap[StoryGeneratorParts.B] = storyTemplates[titleKey].title;
    } else {
      titleMap[StoryGeneratorParts.B] = 'Part B';
    }

    titleKey = getStoryTemplate({
      currentPart: StoryGeneratorParts.C,
      language,
      storyTemplates,
    }).key;

    if (titleKey && storyTemplates[titleKey]) {
      // @ts-ignore
      titleMap[StoryGeneratorParts.C] = storyTemplates[titleKey].title;
    } else {
      titleMap[StoryGeneratorParts.C] = 'Part C';
    }

    return (
      <div className={_styles.StoryGenerator}>
        <div className={_styles.Content}></div>
        <div className={_styles.Explainer}>
          <h2 className={_styles.ExplainerHeader}>
            <strong>
              How does it work?
            </strong>
          </h2>

          <ol>
            <li>
              Answer the questions below
            </li>
            
            <li>
              Our super-clever story generator creates a pre-written scene from your answers
            </li>

            <li>
              You get a chance to edit, add, scrap or entirely re-write the resulting story scene. No rules!
            </li>

            <li>
              Enter your email address (which we’ll never share), and we’ll send you the final edited text 
            </li>

            <li>
              We quickly check over what you’ve written to make sure it isn’t offensive
            </li>

            <li>
              Your written addition goes live to the storyverse!
            </li>
          </ol>

          <p>
            Answer each of the questions, then click the Generate Story button to
            see your personalized story. Click Submit Story to send it to Ice-9 for
            a chance at your words being included in the further narrative of X,
            or being discussed on the podcast by one of the team members!
          </p>
        </div>

        <div className={_styles.InProgressWrapper}>
          <div className={_styles.TheQuestion}>
            <div className={_styles.Content}>
              <div className={_styles.InnerContent}>
                <h3>
                  Why participate?
                </h3>

                <ol>
                  <li>
                    Because it’s fun, just try it.
                  </li>

                  <li>
                    Because imagining future people is less depressing and
                    futile than trying to ignore them, and more productive than
                    simply hoping for the best.
                  </li>
 
                  <li>
                    Because your contribution might trigger debate (or
                    laughter) on the podcast and in the discussion forum.
                  </li>

                  <li> 
                    Because you want to see what happens when your ideas are
                    mashed-up, re-mixed, and fermented with thousands of other
                    inputs by the hello X creative team in our top secret chaos
                    machine at the bottom of the Gakkel Ridge hydrothermal vent
                    (or in the kitchen of our Tromsø studio), creating short
                    stories for use in live performances, interactive apps, or
                    published in old-fashioned, uh… books.
                  </li>
                </ol>
              </div>
            </div>
          </div>

          <div className={_styles.Content}>
            <div className={_styles.InnerContent}>
              <StoryPartSelector
                currentPart={this.props.currentPart}
                setCurrentPart={this.props.setCurrentPart}
                titleMap={titleMap}
              />

              <InProgressStory
                currentPart={this.props.currentPart}
                language={this.props.language}
                setAnswerText={this.props.setAnswerText}
                setStoryState={this.props.setStoryState}
                storyState={this.props.storyState}
                storyTemplate={template}
                templateKey={key}
              />

              {this.props.storyState === StoryStates.Complete ?
                <CompletedStory
                  language={this.props.language}
                  setCurrentPart={this.props.setCurrentPart}
                  setStoryState={this.props.setStoryState}
                  storyTemplate={template}
                /> :
                null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export const mapStateToProps: MapStateToProps<
  TStoryGeneratorStoreProps,
  {},
  {
    language: Languages,
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

  setCurrentPart(value: StoryGeneratorParts) {
    const action = makeStoryGeneratorAction({
      action: CurrentPartAction,
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
