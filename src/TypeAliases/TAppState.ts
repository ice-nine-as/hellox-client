import {
  PageIdentifiers,
} from '../Pages/PageIdentifiers';

export type TAppState = {
  page:    PageIdentifiers,
  loading: boolean,
  done:    boolean,
  error:   boolean,
};

export default TAppState;