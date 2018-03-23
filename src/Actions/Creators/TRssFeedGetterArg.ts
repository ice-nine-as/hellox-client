import {
  IRssFeed,
} from '../../Interfaces/IRssFeed';
import {
  TFeedsMap,
} from '../../TypeAliases/TFeedsMap';

export type TRssFeedGetterArg = {
  composeWith?: IRssFeed | null;
  feedKey:      keyof TFeedsMap;
  id?:          string | null;
  offset?:      number | null;
  urlArg?:      string | null;
};

export default TRssFeedGetterArg;