import {
  IRssAction,
} from '../App/IRssAction';
import {
  Dispatch,
} from 'redux';
import {
  RssActionSubtypes,
} from '../../Enums/RssActionSubtypes';

/* Used with redux-thunk. */
export type TRssFeedGetter =
  (subtype: RssActionSubtypes) => (dispatch: Dispatch<{}>) => Promise<IRssAction>;

export default TRssFeedGetter;