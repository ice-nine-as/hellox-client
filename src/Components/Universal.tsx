import {
  isPageIdentifier,
} from '../TypeGuards/isPageIdentifier';
import {
  Loading,
} from '../Pages/Loading';
import {
  defaultPageIdentifier,
  PageIdentifiers,
} from '../Enums/PageIdentifiers';
import universal from 'react-universal-component';
import {
  ServerError,
} from '../Pages/ServerError';

import * as React from 'react';

export const strings = {
  PAGE_INVALID:
    'The props argument, destructured into the page variable, did not ' +
    'contain a page value that met the isPageIdentifier type guard.',
};

export const importer = ({ page, }: { page: PageIdentifiers, }): Promise<any> => {
  const indexRegex = /^\/?$/
  if (!indexRegex.test(page) && !isPageIdentifier(page)) {
    try {
      return import('../Pages/NotFound');
    } /* istanbul ignore next */ catch (e) {
      throw new Error(`${strings.PAGE_INVALID}\n\n${e.toString()}`);
    }
  }

  let imported;
  try {
    const pathStr = indexRegex.test(page) ? defaultPageIdentifier : page;
    imported = import(`../Pages/${pathStr}`);
  } /* istanbul ignore next */ catch (e) {
    /* Doesn't ever seem to run, even with errors? Will investigate later. */
    imported = import('../Pages/NotFound');
  }

  return imported;
}

export const errorFactory   = () => <ServerError page="serverError" />;
export const loadingFactory = () => <Loading     page="loading"     />;

export const Universal = universal(importer, {
  error:    errorFactory,
  loading:  loadingFactory,
  minDelay: 500,
  timeout:  5000,
});

export default Universal;