import {
  // @ts-ignore
  default as sanitizeHtml,
} from 'sanitize-html';

export const defaultSanitizationOptions = Object.assign({}, sanitizeHtml.defaults, {
  allowedAttributes: Object.assign({}, sanitizeHtml.defaults.allowedAttributes, {
    '*': [
      'class',
    ],
  }),

  allowedTags: sanitizeHtml.defaults.allowedTags.concat([
    'img',
  ]),
});

export const getSanitizedHtml = (html: string, options?: sanitizeHtml.IOptions): {  __html: string, } => {
  return {
    __html: sanitizeHtml(html, options || defaultSanitizationOptions),
  };
};

export default getSanitizedHtml;