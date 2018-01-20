import {
  AppActionTypes,
} from '../../Enums/AppActionTypes';
import {
  IAppAction,
} from './IAppAction';

export const DoneAppAction: IAppAction = Object.freeze({
  type: AppActionTypes.Done,
  value: false,
});

export default DoneAppAction;