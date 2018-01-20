import {
  Action,
} from 'redux';

export interface IAction extends Readonly<Action> {
  readonly type:  any;
  readonly value: any;
}

export default IAction;