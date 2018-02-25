import {
  AppActionTypes,
} from '../Enums/AppActionTypes';
import {
  IViewportStateAction,
} from '../Actions/App/IViewportStateAction';
import {
  isViewportState,
} from './isViewportState';

const strings = {
  ARGUMENT_INVALID:
    'The argument passed to the isViewportStateAction type guard was not an ' +
    'object.',

  TYPE_INVALID:
    'The type property of the argument passed to the isViewportStateAction ' +
    'type guard did not have the type AppActionTypes.ViewportState.',

  VALUE_INVALID:
    'The value property of the argument passed ot the isViewportStateAction ' +
    'type guard did not meet the isViewportState type guard.',
};

export const isViewportStateAction = (maybe: any, logErrors: boolean = false): maybe is IViewportStateAction => {
  if (typeof maybe !== 'object' || maybe === null) {
    logErrors ? console.log(strings.ARGUMENT_INVALID) : null;
    return false;
  } else if (maybe.type !== AppActionTypes.ViewportState) {
    logErrors ? console.log(strings.TYPE_INVALID) : null;
    return false;
  } else if (!isViewportState(maybe.value)) {
    logErrors ? console.log(strings.VALUE_INVALID) : null;
    return false;
  }

  return true;
};

export default isViewportStateAction;