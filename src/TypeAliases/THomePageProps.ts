import {
  IRssAction,
} from '../Actions/App/IRssAction';
import {
  TFeedsMap,
} from './TFeedsMap';

export type THomePageProps = {
  feeds: TFeedsMap,
  loadPodcasts(): Promise<IRssAction>,
};

export default THomePageProps;