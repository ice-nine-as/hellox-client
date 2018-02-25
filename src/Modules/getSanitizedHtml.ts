import * as sanitizeHtml from 'sanitize-html';

export const getSanitizedHtml = (html: string): {  __html: string, } => {
  return {
    __html: sanitizeHtml(html),
  };
};

export default getSanitizedHtml;