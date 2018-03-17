import {
  IAction,
} from '../Actions/IAction';

export type TReducer<T, A extends IAction> = (previousState: T, action: A) => T;

export default TReducer;