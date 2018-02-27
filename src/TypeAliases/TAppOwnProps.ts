import {
  LocationState,
} from 'redux-first-router';

export type TAppOwnProps = {
  done:     boolean;
  error:    boolean;
  loading:  boolean;
  location: LocationState;
}

export default TAppOwnProps;