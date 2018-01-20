import {
  IAppAction,
} from '../Actions/App/IAppAction';
import {
  isAction,
} from './isAction';
import {
  isAppActionType,
} from './isAppActionType';

export function isAppAction(maybe: any): maybe is IAppAction {
  return isAction(maybe) &&
    isAppActionType(maybe.type) &&
    typeof maybe.value === 'boolean';   
}

export default isAppAction;