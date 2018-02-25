import {
  NewsItemStates,
} from '../Enums/NewsItemStates';

export type TNewsItemProps = {
  html:     string;
  language: string;
  link:     string;
  pubDate:  Date;
  title:    string;
  state:    NewsItemStates;
};

export default TNewsItemProps;