import {
  AppActionTypes,
} from '../../Enums/AppActionTypes';
import {
  IAppAction,
} from './IAppAction';

export const ErrorAppAction: IAppAction = Object.freeze({
  type: AppActionTypes.Error,
  value: false,
});

export default ErrorAppAction;