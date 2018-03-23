import {
  IRssAction,
} from '../Actions/App/IRssAction';
import {
  Languages,
} from '../Enums/Languages';
import {
  TFeedsMap,
} from './TFeedsMap';

export type TArticleDispatchProps = {
  getArticle(
    id: string,
    feeds: TFeedsMap,
    language: Languages): Promise<IRssAction>;
};

export default TArticleDispatchProps;