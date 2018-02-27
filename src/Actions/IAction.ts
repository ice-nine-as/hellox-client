import {
  Action,
} from 'redux';

export interface IAction extends Action {
  readonly subtype?: any;
  readonly type:     any;
  readonly value:    any;
}

export default IAction;