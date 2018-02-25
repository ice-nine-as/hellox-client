import {
  IAppAction,
} from '../Actions/App/IAppAction';
import {
  isAction,
} from './isAction';
import {
  isAppActionType,
} from './isAppActionType';

export const isAppAction = (maybe: any): maybe is IAppAction => {
  return isAction(maybe) && isAppActionType(maybe.type);   
}

export default isAppAction;