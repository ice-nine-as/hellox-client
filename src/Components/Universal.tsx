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
import universal from 'react-universal-component';

export function importer({ page }: { page: PageIdentifiers }) {
  return import(`../Pages/${page || 'Home'}.tsx`);
}

export const Universal = universal(importer, {
  error:   () => <ServerError page="serverError" />,
  loading: () => <Loading page="loading" />,
  minDelay: 1200,
});

export default Universal;