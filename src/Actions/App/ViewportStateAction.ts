import {
  AppActionTypes,
} from '../../Enums/AppActionTypes';
import {
  IViewportStateAction,
} from './IViewportStateAction';
import {
  ViewportStates,
} from '../../Enums/ViewportStates';

// @ts-ignore
export const ViewportStateAction: Readonly<IViewportStateAction> = Object.freeze({
  type:  AppActionTypes.ViewportState,
  value: ViewportStates.Mobile,
});

export default ViewportStateAction;