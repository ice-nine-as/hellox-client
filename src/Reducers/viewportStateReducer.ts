import {
  isViewportState,
} from '../TypeGuards/isViewportState';
import {
  isViewportStateAction,
} from '../TypeGuards/isViewportStateAction';
import {
  IViewportStateAction,
} from '../Actions/App/IViewportStateAction';
import {
  ViewportStates,
} from '../Enums/ViewportStates';
import {
  TReducer,
} from '../TypeAliases/TReducer';

export const strings = {
  PREVIOUS_STATE_INVALID:
    'The previousState argument passed to the viewportStateReducer function ' +
    'did not meet the isViewportState type guard.',
};

export const viewportStateReducer: TReducer<ViewportStates> =
  (previousState: ViewportStates = ViewportStates.Mobile,
    action: IViewportStateAction): ViewportStates =>
{
  if (!isViewportState(previousState)) {
    throw new Error(strings.PREVIOUS_STATE_INVALID);
  }

  if (isViewportStateAction(action)) {
    return action.value;
  }
  
  return previousState;
}

export default viewportStateReducer;