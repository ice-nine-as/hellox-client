import {
  getAppReducers,
} from '../Functions/getAppReducers';
import {
  getRootReducer as getStoryGeneratorRootReducer,
} from '../StoryGenerator/Modules/getRootReducer';
import {
  IAction,
} from '../Actions/IAction';
import {
  TReducersMap,
} from '../TypeAliases/TReducersMap';

export function getReducers(): TReducersMap<any, IAction> {
  return Object.assign({}, getAppReducers(), {
    storyGenerator: getStoryGeneratorRootReducer(),
  });
}

export default getReducers;