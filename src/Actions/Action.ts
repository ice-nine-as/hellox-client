import {
  IAction,
} from './IAction';

export class Action implements IAction {
  readonly type:  string;
  readonly value: any;
  readonly strings = {
    VALUE_INVALID:
      'The value argument passed to the Action constructor (or one of its ' +
      'descendants) was undefined.'
  };

  constructor(value: any) {
    if (typeof value === 'undefined') {
      throw new Error(this.strings.VALUE_INVALID);
    }

    this.value = value;
  }
}

export default Action;