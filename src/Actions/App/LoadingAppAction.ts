import {
  AppActionTypes,
} from '../../Enums/AppActionTypes';
import {
  IAppAction,
} from './IAppAction';

export const LoadingAppAction: IAppAction = Object.freeze({
  type: AppActionTypes.Loading,
  value: false,
});

export default LoadingAppAction;