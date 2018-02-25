import {
  LocationState,
} from 'redux-first-router';
import {
  ViewportStates,
} from '../Enums/ViewportStates';

export type TAppOwnProps = {
  location:      LocationState;
  loading:       boolean;
  done:          boolean;
  error:         boolean;
  viewportState: ViewportStates;
}

export default TAppOwnProps;