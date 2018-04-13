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
import styles from '../Styles/Pages/Write.less';
const _styles = styles || {};

export class Write extends React.PureComponent<TPageProps & TWriteStoreProps & TWriteDispatchProps> {
  doLoad() {
    const {
      feeds,
      language,
    } = this.props;

    /* Weird error below -- keeps complaining about null not being a member of
     * keyof TFeedsMap, which doesn't make much sense to me. */
    // @ts-ignore
    const missingKeys: Array<keyof TFeedsMap> = (['A', /*'B', 'C',*/] as Array<StoryGeneratorParts>)
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
      const _actions = actions as Array<IRssAction>;
      _actions.forEach((action) => {
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
        if (template) {
          if (!action.feedKey) {
            return;
          }

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
      <div className={`${_styles.Write} ${_styles.Page}`}>
        <div className={_styles.Content}>
          <div className={_styles.MediaContainer}>
            <img src="https://dynaimage.cdn.cnn.com/cnn/q_auto,w_1024,c_fill,g_auto,h_576,ar_16:9/http%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F170407220907-01-iconic-mountains-k2-restricted.jpg" />
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