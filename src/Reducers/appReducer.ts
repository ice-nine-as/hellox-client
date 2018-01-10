import {
  IAppAction,
} from '../Actions/App/IAppAction';
import {
  isAppAction,
} from '../TypeGuards/isAppAction';

export const strings = {
  PREVIOUSSTATE_INVALID:
    'The previousState argument passed to the appReducer function was not ' +
    'a boolean.',

  ACTION_VALUE_INVALID:
    'The value property of the action argument passed to the appReducer ' +
    'function was not a boolean.',
};

export function appReducer(previousState: boolean = false, action: IAppAction): boolean {
  if (typeof previousState !== 'boolean') {
    throw new Error(strings.PREVIOUSSTATE_INVALID);
  }

  if (isAppAction(action)) {
    if (typeof action.value !== 'boolean') {
      throw new Error(strings.ACTION_VALUE_INVALID);
    }
   
    return action.value;
  }

  return previousState;
}

export default appReducer;