import {
  IAppAction,
} from '../Actions/App/IAppAction';
import {
  isAppAction,
} from '../TypeGuards/isAppAction';
import {
  TReducer,
} from '../TypeAliases/TReducer';

export const strings = {
  PREVIOUS_STATE_INVALID:
    'The previousState argument passed to the appReducer function was not ' +
    'a boolean.',

};

export const appReducer: TReducer<boolean> = (previousState: boolean = false, action: IAppAction): boolean => {
  if (typeof previousState !== 'boolean') {
    throw new Error(strings.PREVIOUS_STATE_INVALID);
  }

  return isAppAction(action) ? action.value : previousState;
}

export default appReducer;