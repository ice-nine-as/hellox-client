import {
  IRssFeed,
} from './IRssFeed';
import {
  IPreviewComponentProps,
} from './IPreviewComponentProps';
import {
  ComponentClass,
  SFC,
} from 'react';

export interface IPreviewFeedProps {
  childComponentConstructor: ComponentClass<IPreviewComponentProps> |
                             SFC<IPreviewComponentProps>;
  feed: IRssFeed | null | undefined;
  noMorePostsUrl?: string;
  pagination: boolean;
}

export default IPreviewFeedProps;
