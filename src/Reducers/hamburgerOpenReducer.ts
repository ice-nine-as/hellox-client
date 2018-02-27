import {
  AppActionTypes,
} from '../Enums/AppActionTypes';
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
    'The previousState argument passed to the hamburgerOpenReducer function ' +
    'was not a boolean.',
};

export const hamburgerOpenReducer: TReducer<boolean> =
  (previousState: boolean = false,
    action: IAppAction): boolean =>
{
  if (typeof previousState !== 'boolean') {
    throw new Error(strings.PREVIOUS_STATE_INVALID);
  }

  if (isAppAction(action) &&
    action.type === AppActionTypes.HamburgerOpen &&
    typeof action.value === 'boolean')
  {
    return action.value;
  }

  return previousState;
}

export default hamburgerOpenReducer;