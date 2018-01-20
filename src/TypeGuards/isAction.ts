import {
  IAction,
} from '../Actions/IAction';

export function isAction(maybe: any): maybe is IAction {
  return typeof maybe === 'object' &&
    maybe &&
    typeof maybe.type === 'string' &&
    'value' in maybe;
}

export default isAction;