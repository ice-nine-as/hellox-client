import {
  TReducer,
} from './TReducer';

export type TReducersMap<T> = {
  [key: string]: TReducer<T>;
}

export default TReducersMap;