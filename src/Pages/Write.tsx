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
  isNode,
} from '../Functions/isNode';
import {
  ConnectedLanguageButton,
} from '../Components/LanguageButton';
import {
  Languages,
} from '../Enums/Languages';
import {
  makeStoryGeneratorAction,
} from '../StoryGenerator/Modules/makeStoryGeneratorAction';
import {
  pickFeed,
} from '../Functions/pickFeed';
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

export const strings = {
  LOAD_ERROR:
    'Sorry, an error was encountered loading the story generator metadata!',
};

/* TODO: Add real, non-rushed internationalization scheme 
 * (react-intl, probably). */

export class Write extends React.Component<TPageProps & TWriteStoreProps & TWriteDispatchProps, { error: string, }> {
  state = {
    error: '',
  };

  doLoad() {
    const {
      feeds,
      language,
    } = this.props;

    const parts = [ 'A', /*'B', 'C',*/ ] as ReadonlyArray<StoryGeneratorParts>;

    const setTemplate = (str: string, feedKey: keyof TFeedsMap) => {
      const template: IFeedTemplate | null = (() => {
        try {
          return JSON.parse(str);
        } catch (e) {
          console.error('Failed to download story template:');
          console.error(e);
          return null;
        }
      })();

      if (template && feedKey) {
        this.props.setStoryTemplate(feedKeyToTemplateKey(feedKey), template);
      } else {
        this.setState({ error: strings.LOAD_ERROR, });
      }
    }

    /* Weird error below -- keeps complaining about null not being a member of
     * keyof TFeedsMap, which doesn't make much sense to me. */
    // @ts-ignore
    const missingKeys: Array<keyof TFeedsMap> = parts.map<keyof TFeedsMap | null>((storyPart) => {
      /* Loads the relevant feed based on language and detail level. */
      const {
        feed,
        key,
      } = pickFeed({
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

    if (missingKeys.length < parts.length) {
      /* We now know there are already parts loaded, and we have to turn them
       * into StoryTemplate objects. */
      parts.forEach((storyPart) => {
        const {
          feed,
          key,
        } = pickFeed({
          feeds,
          language,
          storyPart,
          type: 'storyTemplate',
        });

        if (feed && feed.items && feed.items.length) {
          setTemplate(feed.items[0].description, key);
        }
      });
    }

    /* Load the ones that don't already exist. */
    const partPromises = missingKeys.map((key: keyof TFeedsMap) => {
      return this.props.getStoryTemplate(key)
        .catch((reason) => console.error(reason));
    });

    Promise.all(partPromises).then((actions) => {
      (actions as Array<IRssAction>).forEach((action) => {
        if (!action || !action.value) {
          this.setState({ error: strings.LOAD_ERROR, });
          return;
        } else if (!action.value.items || !action.value.items.length) {
          return;
        }

        const str = action.value.items[0].description;
        setTemplate(str, action.feedKey as keyof TFeedsMap);
      });
    });
  }

  componentDidMount() {
    if (!isNode()) {
      this.doLoad();
    }
  }

  componentDidUpdate() {
    const {
      error,
    } = this.state;

    if (!isNode() && !error) {
      this.doLoad();
    }
  }

  render() {
    const {
      language,
    } = this.props;

    return (
      <div className={`${styles.Write} ${styles.Page}`}>
        <div className={styles.HeroImageContainer}>
          <img
            className={styles.Image}
            src={ImageUrls.WriteHeroAnimation}
          />

          <div className={styles.Border}></div>
        </div>

        <div className={styles.LanguageButtonContainer}>
          <h2 className={styles.ExplainerHeader}>
            {(() => {
              if (language === Languages.Norwegian) {
                return 'Velg Språk';
              } else {
                return 'Select language';
              }
            })()}
          </h2>

          {(Object as any).values(Languages)
            .filter((lang: Languages) => lang !== Languages.Russian)
            .map((lang: Languages, index: number) => {
              return (
                <ConnectedLanguageButton
                  buttonLanguage={lang}
                  className={styles.LanguageButton}
                  key={index}
                />
              );
            })}
        </div>

        <div className={styles.Explainer}>
          <h2 className={styles.ExplainerHeader}>
            <strong>
              {(() => {
                if (language === Languages.Norwegian) {
                  return 'Sett inn visjon nedenfor';
                } else {
                  return 'How do I add my vision to a story?';
                }
              })()}
            </strong>
          </h2>

          <ol className={styles.ExplainerList}>
            <li>
              {(() => {
                if (language === Languages.Norwegian) {
                  return 'Svar på spørsmålene nedenfor.';
                } else {
                  return 'Answer the questions below.';
                }
              })()}
            </li>
            
            <li>
              {(() => {
                if (language === Languages.Norwegian) {
                  return 'Vår supersmarte historiegenerator kombinerer en ' +
                         'forhåndsskrevet scene med svarene dine.';
                } else {
                  return 'Our super-clever story generator creates a ' +
                         'pre-written scene from your answers.';
                }
              })()}
            </li>

            <li>
              {(() => {
                if (language === Languages.Norwegian) {
                  return 'Du vil få muligheten til å redigere, legge til ' +
                         'eller omskrive hele scenen. Ingen regler!';
                } else {
                  return 'You get a chance to edit, add, scrap or entirely ' +
                         're-write the resulting story scene. No rules!';
                }
              })()}
            </li>

            <li>
              {(() => {
                if (language === Languages.Norwegian) {
                  return 'Skriv inn din epostadresse (som vi aldri kommer ' +
                         'til å dele) og vi sender deg den ferdig redigerte ' +
                         'teksten.';
                } else {
                  return 'Enter your email address (which we’ll never ' +
                         'share), and we’ll send you the final edited text.';
                }
              })()}
            </li>

            <li>
              {(() => {
                if (language === Languages.Norwegian) {
                  return 'Vi ser over teksten din for å forsikre oss om at ' +
                         'den ikke er krenkende.';
                } else {
                  return 'We quickly check over what you’ve written to make ' +
                         'sure it isn’t offensive';
                }
              })()}
            </li>

            <li>
              {(() => {
                if (language === Languages.Norwegian) {
                  return 'Ditt bidrag blir lagt til historieuniverset!';
                } else {
                  return 'Your written addition goes live to the storyverse!';
                }
              })()}
            </li>
          </ol>
        </div>

        <div className={styles.Participate}>
          <div className={styles.Content}>
            <div className={styles.InnerContent}>
              <h3>
                {(() => {
                  if (language === Languages.Norwegian) {
                    return 'Hvorfor delta?';
                  } else {
                    return 'Why participate?';
                  }
                })()}
              </h3>

              <ol className={styles.ParticipateList}>
                <li>
                  {(() => {
                    if (language === Languages.Norwegian) {
                      return 'Fordi det er artig. Bare prøv.';
                    } else {
                      return 'Because it’s fun, just try it.';
                    }
                  })()}
                </li>

                <li>
                  {(() => {
                    if (language === Languages.Norwegian) {
                      return 'Fordi det å forestille seg framtidens ' +
                             'mennesker er mindre deprimerende og ' +
                             'bortkastet enn å ignorere dem, og mer ' +
                             'produktivt enn å bare håpe på det beste.';
                    } else {
                      return 'Because imagining future people is less ' +
                             'depressing and futile than trying to ignore ' +
                             'them, and more productive than simply hoping ' +
                             'for the best.';
                    }
                  })()}
                </li>

                <li>
                  {(() => {
                    if (language === Languages.Norwegian) {
                      return 'Fordi ditt bidrag kan muligens skape debatt ' +
                             '(eller latter) i vår podcast og i vårt ' +
                             'diskusjonsforum';
                    } else {
                      return 'Because your contribution might trigger debate ' +
                             '(or laughter) on the podcast and in the ' +
                             'discussion forum.';
                    }
                  })()}
                </li>

                <li>
                  {(() => {
                    if (language === Languages.Norwegian) {
                      return 'Fordi du ønsker å se hva som skjer når dine ' +
                             'ideer blir mikset og fermentert sammen med ' +
                             'tusenvis av andre bidrag fra hello X sitt ' +
                             'kreative team i vår topphemmelige kaosmaskin ' +
                             'på bunnen av de hydrotermiske ' +
                             'undervannsventilene til Gakkel-fjellryggen ' +
                             '(eller i vårt studiokjøkken i Tromsø), hvor ' +
                             'det blir skapt historier til bruk i ' +
                             'liveopptredener, interaktive apper eller ' +
                             'publisert i gammeldagse, eh...bøker.';
                    } else {
                      return 'Because you want to see what happens when ' +
                             'your ideas are mashed-up, re-mixed, and ' +
                             'fermented with thousands of other inputs by ' +
                             'the hello X creative team in our top secret ' +
                             'chaos machine at the bottom of the Gakkel ' +
                             'Ridge hydrothermal vent (or in the kitchen of ' +
                             'our Tromsø studio), creating short stories ' +
                             'for use in live performances, interactive ' +
                             'apps, or published in old-fashioned, uh… books.';
                    }
                  })()}
                </li>
              </ol>
            </div>
          </div>
        </div>

        {
          this.state.error ?
            <div className={styles.Message}>{this.state.error}</div> :
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