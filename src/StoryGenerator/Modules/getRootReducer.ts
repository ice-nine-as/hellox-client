import {
  currentPartReducer,
} from '../Reducers/currentPartReducer';
import {
  getStoryTemplateReducers,
} from './getStoryTemplateReducers';
import {
  combineReducers,
  Reducer,
} from 'redux';
import {
  storyStateReducer,
} from '../Reducers/storyStateReducer';
import {
  TStoryGeneratorStoreProps
} from '../TypeAliases/TStoryGeneratorStoreProps';

export const getRootReducer = (): Reducer<TStoryGeneratorStoreProps> => {
  return combineReducers({
    currentPart:    currentPartReducer,
    storyTemplates: getStoryTemplateReducers(),
    storyState:     storyStateReducer,
  } as any);
};

export default getRootReducer;