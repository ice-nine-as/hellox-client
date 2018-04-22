import {
  createRssThunk,
} from '../Actions/Creators/createRssThunk';
import {
  feedKeyToTemplateKey,
} from '../StoryGenerator/Modules/feedKeyToTemplateKey';
import {
  getAttrFromFeedTemplate,
} from '../StoryGenerator/Modules/getAttrFromFeedTemplate';
import {
  getFeed,
} from '../Modules/getFeed';
import {
  IFeedTemplate,
} from '../StoryGenerator/Interfaces/IFeedTemplate';
import {
  ImageUrls,
} from '../Enums/ImageUrls';
import {
  IQuestionModel,
} from '../StoryGenerator/Interfaces/IQuestionModel';
import {
  IRssAction,
} from '../Actions/App/IRssAction';
import {
  isFeedTemplate,
} from '../StoryGenerator/TypeGuards/isFeedTemplate';
import {
  isNode,
} from '../Modules/isNode';
import {
  makeStoryGeneratorAction,
} from '../StoryGenerator/Modules/makeStoryGeneratorAction';
import {
  connect,
  MapStateToProps,
} from 'react-redux';
import {
  ConnectedStoryGenerator,
} from '../StoryGenerator/Components/StoryGenerator';
import {
  StoryGeneratorParts,
} from '../StoryGenerator/Enums/StoryGeneratorParts';
import {
  StoryGeneratorTemplateKeys,
} from '../StoryGenerator/Enums/StoryGeneratorTemplateKeys';
import {
  StoryTemplateAction,
} from '../StoryGenerator/Actions/StoryTemplateAction';
import {
  TFeedsMap,
} from '../TypeAliases/TFeedsMap';
import {
  TPageProps
} from '../TypeAliases/TPageProps';
import {
  TStoreProps,
} from '../TypeAliases/TStoreProps';
import {
  TWriteDispatchProps,
} from '../TypeAliases/TWriteDispatchProps';
import {
  TWriteStoreProps,
} from '../TypeAliases/TWriteStoreProps';

import * as React from 'react';

// @ts-ignore
import _styles from '../Styles/Pages/Write.less';
const styles = _styles || {};

export class Write extends React.PureComponent<TPageProps & TWriteStoreProps & TWriteDispatchProps> {
  doLoad() {
    const {
      feeds,
      language,
    } = this.props;

    /* Weird error below -- keeps complaining about null not being a member of
     * keyof TFeedsMap, which doesn't make much sense to me. */
    // @ts-ignore
    const missingKeys: Array<keyof TFeedsMap> = ([ 'A', /*'B', 'C',*/ ] as Array<StoryGeneratorParts>)
      .map<keyof TFeedsMap | null>((storyPart) => {
        /* Loads the relevant feed based on language and detail level. */
        const {
          feed,
          key,
        } = getFeed({
          feeds,
          language,
          storyPart,
          type: 'storyTemplate',
        });

        if (feed) {
          /* Return null if the feed already exists so it's not refetched. */
          return null;
        } else {
          return key;
        }
      }).filter((aa: keyof TFeedsMap | null) => aa !== null);

    const partPromises = missingKeys.map((key: keyof TFeedsMap) => {
      return this.props.getStoryTemplate(key)
        .catch((reason) => console.error(reason));
    });

    Promise.all(partPromises).then((actions) => {
      (actions as Array<IRssAction>).forEach((action) => {
        if (!action.value ||
          !action.value.items ||
          !action.value.items.length) {
          return;
        }

        const str = action.value.items[0].description;
        const obj: object | null = (() => {
          try {
            return JSON.parse(str);
          } catch (e) {
            console.error('Failed to download story template:');
            console.error(e);
            return null;
          }
        })();

        if (!obj) {
          return;
        }

        const template: IFeedTemplate | null = isFeedTemplate(obj) ?
          obj :
          null;
        if (template && action.feedKey) {
          this.props.setStoryTemplate(feedKeyToTemplateKey(action.feedKey), template);
        }
      });
    });
  }

  componentDidMount() {
    if (!isNode()) {
      this.doLoad();
    }
  }

  render() {
    return (
      <div className={`${styles.Write} ${styles.Page}`}>
        <div className={styles.MediaContainer}>
          <img
            className={styles.HeroAnimation}
            src={ImageUrls.WriteHeroAnimation}
          >
          </img>
        </div>

        <div className={styles.Explainer}>
          <h2 className={styles.ExplainerHeader}>
            <strong>
              How do I add my vision to a story?
            </strong>
          </h2>

          <ol className={styles.ExplainerList}>
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
        </div>

        <div className={styles.Participate}>
          <div className={styles.Content}>
            <div className={styles.InnerContent}>
              <h3>
                Why participate?
              </h3>

              <ol className={styles.ParticipateList}>
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
        {
          /* It's not clear why, but rendering this as JSX breaks big-time. */
          React.createElement(ConnectedStoryGenerator)
        }
      </div>
    );
  }
}

export const mapStateToProps: MapStateToProps<TWriteStoreProps, TPageProps, TStoreProps> = ({
  language,
  location,
  feeds,
}, ownProps) => ({
  ...ownProps,
  feeds,
  location,
  language,
});

export const mapDispatchToProps = (dispatch: Function) => ({
  getStoryTemplate(feedKey: keyof TFeedsMap): Promise<IRssAction> {
    const thunk = createRssThunk({
      feedKey: feedKey,
    });

    return dispatch(thunk);
  },

  setStoryTemplate(key: StoryGeneratorTemplateKeys, value: IFeedTemplate) {
    const template = {
      questions: Object.freeze(getAttrFromFeedTemplate('questions', value) as Array<IQuestionModel>),
      storyText: getAttrFromFeedTemplate('storyText', value) as string,
      title: getAttrFromFeedTemplate('title', value) as string,
    };

    const action = makeStoryGeneratorAction({
      action: StoryTemplateAction,
      templateKey: key,
      value: template,
    });

    return dispatch(action);
  },
});

export const ConnectedWrite = connect(mapStateToProps, mapDispatchToProps)(Write);

export default ConnectedWrite;