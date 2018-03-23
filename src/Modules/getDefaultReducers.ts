/*import {
  getRootReducer as getStoryGeneratorReducers,
} from 'x50-story-generator/dist/esnext';*/
import {
  getAppReducers,
} from '../Modules/getAppReducers';
import {
  IAction,
} from '../Actions/IAction';
import {
  TReducersMap,
} from '../TypeAliases/TReducersMap';

export function getDefaultReducers(): TReducersMap<any, IAction> {
  return {
    ...getAppReducers(),
    /*storyGenerator: combineReducers(getStoryGeneratorReducers()),*/
  };
}

export default getDefaultReducers;