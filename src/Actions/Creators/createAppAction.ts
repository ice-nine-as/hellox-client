import {
  IAppAction,
} from '../App/IAppAction';

export const createAppAction = (action: IAppAction, value: any): IAppAction => {
  return Object.freeze(Object.assign({}, action, { value, }));
};

export default createAppAction;