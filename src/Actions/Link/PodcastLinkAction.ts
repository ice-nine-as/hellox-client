import {
  ILinkAction,
} from './ILinkAction';
import {
  PageIdentifiers,
} from '../../Enums/PageIdentifiers';

export const PodcastLinkAction: ILinkAction = Object.freeze({
  type: PageIdentifiers.Podcast,
  payload: {},
  value: null,
});

export default PodcastLinkAction;