import {
  AppActionTypes,
} from '../Enums/AppActionTypes';

export function isAppActionType(maybe: any): maybe is AppActionTypes {
  return Object.values(AppActionTypes).includes(maybe);
}

export default isAppActionType;