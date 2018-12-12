import {
  FeedDetailLevels,
} from '../Enums/FeedDetailLevels';

export type TLatestPodcastsOwnProps = {
  detailLevel: FeedDetailLevels;
  pagination: boolean;
};

export default TLatestPodcastsOwnProps;