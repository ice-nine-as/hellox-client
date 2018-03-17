/*import {
  getRootReducer as getDefaultStoryGeneratorReducers,
} from 'x50-story-generator/dist/esnext';*/
import {
  getDefaultAppReducers,
} from '../Modules/getDefaultAppReducers';
import {
  IAction,
} from '../Actions/IAction';
import {
  TReducersMap,
} from '../TypeAliases/TReducersMap';

export function getDefaultReducers(): TReducersMap<any, IAction> {
  return {
    ...getDefaultAppReducers(),
    /*...getDefaultStoryGeneratorReducers(),*/
  };
}

export default getDefaultReducers;