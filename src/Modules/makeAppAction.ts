import {
  IAppAction,
} from '../Actions/App/IAppAction';

export const makeAppAction = (action: IAppAction, value: any): IAppAction => {
  return Object.freeze(Object.assign({}, action, { value, }));
};

export default makeAppAction;