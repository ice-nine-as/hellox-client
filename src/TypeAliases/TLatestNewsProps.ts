import {
  IRssFeed,
} from '../Interfaces/IRssFeed';
import {
  Languages,
} from '../Enums/Languages';

export type TLatestNewsProps = {
  language: Languages;
  rss:      IRssFeed; 
};

export default TLatestNewsProps;