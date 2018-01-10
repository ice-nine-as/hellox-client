import {
  AppActionTypes,
} from '../../Enums/AppActionTypes';
import {
  IAction,
} from '../IAction';

export interface IAppAction extends IAction {
  readonly type:  AppActionTypes;
  readonly value: boolean;
}

export default IAppAction;