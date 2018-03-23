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
  getRssFeedThunk,
} from '../Actions/Creators/getRssFeedThunk';
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
    /* Loads the relevant feed based on language and detail level. */ 
    const {
      feed,
    } = getFeed(
      'newsItem',
      this.props.language,
      this.props.feeds,
      FeedDetailLevels.Full);

    const id = (this.props.location.payload as any).id.toString();
    if (!feed || !getFeedItem(id, feed)) {
      this.props.getArticle(
        id,
        this.props.feeds,
        this.props.language);
    }
  }

  componentDidMount() {
    this.doLoad();
  }

  componentDidUpdate() {
    this.doLoad();
  }


  render() {
    const id = (this.props.location.payload as any).id.toString();
    const { feed, } = getFeed(
      'newsItem',
      this.props.language,
      this.props.feeds,
      FeedDetailLevels.Full);

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
    const feedObj = getFeed(
      'newsItem',
      language,
      feeds,
      FeedDetailLevels.Full);

    const thunk = getRssFeedThunk({
      composeWith: feedObj.feed,
      feedKey: feedObj.key,
      id,
    });

    return dispatch(thunk);
  },
});

export const ConnectedArticle = connect(mapStateToProps, mapDispatchToProps)(Article); 

export default ConnectedArticle;