import {
  FeedDetailLevels,
} from '../Enums/FeedDetailLevels';
import {
  getFeed,
} from '../Modules/getFeed';
import {
  getFeedItem,
} from '../Modules/getFeedItem';
import {
  createRssThunk,
} from '../Actions/Creators/createRssThunk';
import {
  IRssAction,
} from '../Actions/App/IRssAction';
import {
  Languages,
} from '../Enums/Languages';
import {
  NewsItemFull,
} from '../Components/NewsItemFull';
import {
  connect,
  MapStateToProps,
} from 'react-redux';
import {
  TArticleDispatchProps,
} from '../TypeAliases/TArticleDispatchProps';
import {
  TArticleStoreProps,
} from '../TypeAliases/TArticleStoreProps';
import {
  TFeedsMap,
} from '../TypeAliases/TFeedsMap';
import {
  TStoreProps,
} from '../TypeAliases/TStoreProps';

import * as React from 'react';

// @ts-ignore
import styles from '../Styles/Pages/Article.less';
const _styles = styles || {};

export class Article extends React.Component<TArticleStoreProps & TArticleDispatchProps> {
  doLoad() {
    const {
      feeds,
      getArticle,
      language,
      location: {
        payload,
      },
    } = this.props;

    /* Loads the relevant feed based on language and detail level. */ 
    const {
      feed,
    } = getFeed({
      detailLevel: FeedDetailLevels.Full,
      feeds,
      language,
      type: 'newsItem',
    });

    const id = (payload as any).id.toString();
    if (!feed || !getFeedItem(id, feed)) {
      getArticle(id, feeds, language);
    }
  }

  componentDidMount() {
    this.doLoad();
  }

  componentDidUpdate() {
    this.doLoad();
  }


  render() {
    const {
      feeds,
      language,
      location: {
        payload,
      },
    } = this.props;

    const id = (payload as any).id.toString();
    const {
      feed,
    } = getFeed({
      detailLevel: FeedDetailLevels.Full,
      feeds,
      language,
      type: 'newsItem',
    });

    const item = feed ? getFeedItem(id, feed) : null;

    return (
      <div className={_styles.Article}>
        {item ?
          <NewsItemFull item={item} /> :
          'Article is loading...'}
      </div>
    );
  }
}

export const mapStateToProps: MapStateToProps<TArticleStoreProps, null, TStoreProps> = ({
  feeds,
  language,
  location,
}) => ({
  feeds,
  language,
  location,
});

export const mapDispatchToProps = (dispatch: Function) => ({
  getArticle(id: string, feeds: TFeedsMap, language: Languages): Promise<IRssAction> {
    const {
      feed,
      key,
    } = getFeed({
      detailLevel: FeedDetailLevels.Full,
      feeds,
      language,
      type: 'newsItem',
    });

    const thunk = createRssThunk({
      composeWith: feed,
      feedKey:     key,
      id,
    });

    return dispatch(thunk);
  },
});

export const ConnectedArticle = connect(mapStateToProps, mapDispatchToProps)(Article); 

export default ConnectedArticle;