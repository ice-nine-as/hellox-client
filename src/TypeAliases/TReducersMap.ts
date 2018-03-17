import {
  IAction,
} from '../Actions/IAction';
import {
  TReducer,
} from './TReducer';

export type TReducersMap<T, A extends IAction> = {
  readonly [key: string]: TReducer<T, A>;
}

export default TReducersMap;