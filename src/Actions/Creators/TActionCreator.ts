import {
  IAction,
} from '../IAction';

export type TActionCreator =
  (action: IAction, value: any, subtype?: any) => IAction;

export default TActionCreator;