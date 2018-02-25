import {
  IViewportStateAction,
} from '../Actions/App/IViewportStateAction';
import {
  isViewportState,
} from '../TypeGuards/isViewportState';
import {
  isViewportStateAction,
} from '../TypeGuards/isViewportStateAction';
import {
  ViewportStates,
} from '../Enums/ViewportStates';

export const strings = {
  VIEWPORT_STATE_ACTION_INVALID:
    'The ViewportStateAction argument passed to the makeViewportStateAction function did not ' +
    'meet the isViewportStateAction type guard.',

  VALUE_INVALID:
    'The value argument passed to the makeViewportStateAction function was not null, ' +
    'nor did it meet the isViewportStateFeed type guard.',
};

export const makeViewportStateAction =
  (ViewportStateAction: IViewportStateAction,
    value: ViewportStates): IViewportStateAction =>
{
  if (!isViewportStateAction(ViewportStateAction)) {
    throw new Error(strings.VIEWPORT_STATE_ACTION_INVALID);
  } else if (!isViewportState(value)) {
    throw new Error(strings.VALUE_INVALID);
  }

  return Object.assign({}, ViewportStateAction, { value, });
}

export default makeViewportStateAction;