import {
  getDefaultAppReducers,
} from '../Modules/getDefaultAppReducers';
import {
  TReducersMap,
} from '../TypeAliases/TReducersMap';

export function getDefaultReducers(): TReducersMap<any> {
  const reducers = {
    ...getDefaultAppReducers(),
  };

  return reducers;
}

export default getDefaultReducers;