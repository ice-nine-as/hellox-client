import {
  AppActionTypes,
} from '../../Enums/AppActionTypes';
import {
  IAppAction,
} from './IAppAction';
import {
  ViewportStates,
} from '../../Enums/ViewportStates';

export interface IViewportStateAction extends IAppAction {
  readonly type:  AppActionTypes.ViewportState;
  readonly value: ViewportStates;
}

export default IViewportStateAction;