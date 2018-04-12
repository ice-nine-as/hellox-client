import {
  ILinkAction,
} from './ILinkAction';
import {
  PageIdentifiers,
} from '../../Enums/PageIdentifiers';

export const PodcastsLinkAction: ILinkAction = Object.freeze({
  type: PageIdentifiers.Podcasts,
  payload: {},
  value: null,
});

export default PodcastsLinkAction;