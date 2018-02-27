import {
  cmsStoryTemplateUrl,
} from '../Properties/cmsStoryTemplateUrl';
import {
  IStoryGeneratorAction,
  IStoryTemplate,
  makeStoryGeneratorAction,
  StoryTemplateAction,
} from 'x50-story-generator/dist/esnext';

const fetch = require('isomorphic-fetch');

const htmlparser2 = require('htmlparser2');

export const getStoryTemplate: () => (dispatch: Function) => Promise<IStoryGeneratorAction> = () => {
  // @ts-ignore
  return async (dispatch: Function): Promise<IStoryGeneratorAction> => {
    // We can dispatch both plain object actions and other thunks,
    // which lets us compose the asynchronous actions in a single flow.

    const res = await fetch(cmsStoryTemplateUrl, {
      cache:       'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'omit',
      method:      'GET', // *GET, PUT, DELETE, etc.
    });

    const resText = await res.text();

    return new Promise<IStoryGeneratorAction>((resolve, reject) => {
      // @ts-ignore
      const handler = new htmlparser2.DomHandler((err: any, dom: Array<object>) => {
        if (err) {
          reject(err);
        }

        let storyTemplate: IStoryTemplate | null = null;
        /*dom.forEach((node) => {
          if (node.name === 'html') {
            node.children.forEach
          }
        });*/

        resolve(dispatch(makeStoryGeneratorAction(StoryTemplateAction, storyTemplate)));
      });

      const parser = new htmlparser2.Parser(handler);
      parser.write(resText);
      parser.end();
    });
  };
}