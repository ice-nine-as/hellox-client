import {
  LocationState,
} from 'redux-first-router';

export type TAppStoreProps = {
  done:          boolean;
  error:         boolean;
  hamburgerOpen: boolean;
  loading:       boolean;
  location:      LocationState;
}

export default TAppStoreProps;