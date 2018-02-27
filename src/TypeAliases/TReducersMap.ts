import {
  TReducer,
} from './TReducer';

export type TReducersMap<T> = {
  readonly [key: string]: TReducer<T>;
}

export default TReducersMap;