import {
  IAction,
} from '../Actions/IAction';

export type TReducer<T> = (previousState: T, action: IAction) => T;

export default TReducer;