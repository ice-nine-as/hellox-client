import {
  IAppAction,
} from '../Actions/App/IAppAction';
import {
  LocationState,
} from 'redux-first-router';

export type TAppProps = {
  location: LocationState;
  loading:  boolean;
  done:     boolean;
  error:    boolean;
  setDone:    (value: boolean) => IAppAction,
  setError:   (value: boolean) => IAppAction,
  setLoading: (value: boolean) => IAppAction,
}

export default TAppProps;