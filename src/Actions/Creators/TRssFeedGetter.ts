import {
  IAction,
} from '../IAction';
import {
  IRssAction,
} from '../App/IRssAction';
import {
  Dispatch,
} from 'redux';
import {
  TRssFeedGetterArg,
} from './TRssFeedGetterArg';

/* Used with redux-thunk. */
export type TRssFeedGetter =
  (argObj: TRssFeedGetterArg) =>
    (dispatch: Dispatch<IAction>) =>
      Promise<IRssAction>;

export default TRssFeedGetter;