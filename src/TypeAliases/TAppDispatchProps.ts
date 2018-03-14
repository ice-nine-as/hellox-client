import {
  IAppAction,
} from '../Actions/App/IAppAction';

export type TAppDispatchProps = {
  setDone(value: boolean):                 IAppAction;
  setError(value: boolean):                IAppAction;
  setLoading(value: boolean):              IAppAction;
};

export default TAppDispatchProps;