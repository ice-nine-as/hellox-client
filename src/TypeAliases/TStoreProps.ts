import {
  ILatestForumPostsFeed,
} from '../Interfaces/ILatestForumPostsFeed';
import {
  Languages,
} from '../Enums/Languages';
import {
  LocationState,
} from 'redux-first-router';
import {
  TFeedsMap,
} from './TFeedsMap';

export type TStoreProps = {
  done:             boolean;
  error:            boolean;
  hamburgerOpen:    boolean;
  language:         Languages;
  latestForumPosts: ILatestForumPostsFeed | null;
  loading:          boolean;
  location:         LocationState;
  feeds:            TFeedsMap;
};

export default TStoreProps;