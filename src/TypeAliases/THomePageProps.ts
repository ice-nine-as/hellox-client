import {
  IRssAction,
} from '../Actions/App/IRssAction';
import {
  Languages,
} from '../Enums/Languages';
import {
  TFeedsMap,
} from './TFeedsMap';

export type THomePageProps = {
  feeds: TFeedsMap;
  language: Languages;
  loadPodcasts(): Promise<IRssAction>;
};

export default THomePageProps;