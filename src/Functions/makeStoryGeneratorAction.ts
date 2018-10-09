import {
  IStoryGeneratorAction,
} from '../Actions/App/IStoryGeneratorAction';
import {
  StoryGeneratorTemplateKeys,
} from '../Enums/StoryGeneratorTemplateKeys';

export const makeStoryGeneratorAction = ({
  action,
  id,
  templateKey,
  value,
}: {
  action:       IStoryGeneratorAction,
  id?:          string,
  templateKey?: StoryGeneratorTemplateKeys,
  value:        any,
}): IStoryGeneratorAction =>
{
  const _action = Object.assign({}, action, { value, });
  if (id) {
    _action.id = id;
  }

  if (templateKey) {
    _action.templateKey = templateKey;
  }

  return Object.freeze(_action);
};

export default makeStoryGeneratorAction;