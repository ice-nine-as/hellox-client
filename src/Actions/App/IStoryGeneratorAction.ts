import {
  Action,
} from 'redux';
import {
  StoryGeneratorActionTypes,
} from '../../Enums/StoryGeneratorActionTypes';
import {
  StoryGeneratorTemplateKeys,
} from '../../Enums/StoryGeneratorTemplateKeys';


export interface IStoryGeneratorAction extends Action {
  id?:          string;
  type:         StoryGeneratorActionTypes;
  templateKey?: StoryGeneratorTemplateKeys; 
  value:        any;
}

export default IStoryGeneratorAction;