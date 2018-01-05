import {
  isPageIdentifier,
} from '../TypeGuards/isPageIdentifier';
import {
  Loading,
} from '../Pages/Loading';
import {
  PageIdentifiers,
} from '../Pages/PageIdentifiers';
import {
  ServerError,
} from '../Pages/ServerError';

import * as React from 'react';
import universal  from 'react-universal-component';

export const strings = {
  PAGE_INVALID:
    'The props argument, destructured into the page variable, did not ' +
    'contain a page value that met the isTypeIdentifier type guard.',
};

export function importer({ page }: { page: PageIdentifiers }) {
  if (!isPageIdentifier(page)) {
    throw new Error(strings.PAGE_INVALID);
  }

  const filepath = ((page[0] || '').toUpperCase() + page.slice(1)) || 'Home';
  return import(`../Pages/${filepath}.tsx`);
}

export const Universal = universal(importer, {
  error:    () => <ServerError page="serverError" />,
  loading:  () => <Loading     page="loading"     />,
  minDelay: 1200,
});

export default Universal;