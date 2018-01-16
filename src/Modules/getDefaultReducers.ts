import {
  getDefaultAppReducers,
} from '../Modules/getDefaultAppReducers';
import {
  TReducersMap,
} from '../TypeAliases/TReducersMap';

export function getDefaultReducers(): TReducersMap<any> {
  return {
    ...getDefaultAppReducers(),
  };
}

export default getDefaultReducers;