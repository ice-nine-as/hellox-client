/*import {
  getRootReducer as getDefaultStoryGeneratorReducers,
} from 'x50-story-generator/dist/esnext';*/
import {
  getDefaultAppReducers,
} from '../Modules/getDefaultAppReducers';
import {
  TReducersMap,
} from '../TypeAliases/TReducersMap';

export function getDefaultReducers(): TReducersMap<any> {
  return {
    ...getDefaultAppReducers(),
    /*...getDefaultStoryGeneratorReducers(),*/
  };
}

export default getDefaultReducers;