import {
  IAppAction,
} from '../Actions/App/IAppAction';
import {
  IViewportStateAction,
} from '../Actions/App/IViewportStateAction';
import {
  ViewportStates,
} from '../Enums/ViewportStates';

export type TAppDispatchProps = {
  setDone(value: boolean):                 IAppAction;
  setError(value: boolean):                IAppAction;
  setLoading(value: boolean):              IAppAction;
  setViewportState(value: ViewportStates): IViewportStateAction;
};

export default TAppDispatchProps;