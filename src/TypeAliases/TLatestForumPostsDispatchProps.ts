import {
  ILatestForumTopicsAction,
} from '../Actions/App/ILatestForumTopicsAction';

export type TLatestForumPostsDispatchProps = {
  fetchLatestForumPosts(): Promise<ILatestForumTopicsAction>;
};

export default TLatestForumPostsDispatchProps;
