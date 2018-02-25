import {
  ViewportStates,
} from '../Enums/ViewportStates';

export const isViewportState = (maybe: any): maybe is ViewportStates => {
  return (Object as any).values(ViewportStates).indexOf(maybe) !== -1;
};

export default isViewportState;