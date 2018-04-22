import {
  IRssAction,
} from '../Actions/App/IRssAction';

export type TPodcastDispatchProps = {
  getPodcasts(): Promise<IRssAction>,
};

export default TPodcastDispatchProps;