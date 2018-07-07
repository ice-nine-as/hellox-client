import {
  ILatestForumPostsAction,
} from '../Actions/App/ILatestForumPostsAction';

export type TLatestForumPostsDispatchProps = {
  fetchLatestForumPosts(): Promise<ILatestForumPostsAction>;
};

export default TLatestForumPostsDispatchProps;