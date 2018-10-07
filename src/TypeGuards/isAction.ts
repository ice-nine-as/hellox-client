import {
  IAction,
} from '../Actions/IAction';

export function isAction(maybe: any): maybe is IAction {
  return Boolean(
    typeof maybe === 'object' &&
    maybe &&
    typeof maybe.type === 'string' &&
    maybe.type &&
    'value' in maybe
  );
}

export default isAction;