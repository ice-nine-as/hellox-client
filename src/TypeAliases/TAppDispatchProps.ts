import {
  IAppAction,
} from '../Actions/App/IAppAction';
import {
  ILinkAction,
} from '../Actions/Link/ILinkAction';

export type TAppDispatchProps = {
  setDone(value: boolean):            IAppAction,
  setError(value: boolean):           IAppAction,
  setErrorPage():                     ILinkAction,
  setHamburgerStatus(value: boolean): IAppAction,
  setLoading(value: boolean):         IAppAction,
};

export default TAppDispatchProps;