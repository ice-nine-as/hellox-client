import {
  IAction,
} from '../IAction';

export type TActionCreator<T extends IAction> =
  (action: T, value: any, subtype?: any) => T;

export default TActionCreator;