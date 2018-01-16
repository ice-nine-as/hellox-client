jest.mock('../../src/TypeGuards/isPageIdentifier');
import {
  isPageIdentifier,
} from '../../src/TypeGuards/isPageIdentifier';

jest.mock('../../src/Pages/Loading');
import {
  Loading,
} from '../../src/Pages/Loading';

import {
  defaultPageIdentifier,
  PageIdentifiers,
} from '../../src/Enums/PageIdentifiers';

jest.mock('react-universal-component');
const universal = require('react-universal-component').default;

jest.mock('../../src/Pages/NotFound');
import {
  NotFound,
} from '../../src/Pages/NotFound';

jest.mock('../../src/Pages/ServerError');
import {
  ServerError,
} from '../../src/Pages/ServerError';

import * as React from 'react';

import {
  errorFactory,
  importer,
  loadingFactory,
  strings,
  Universal,
} from '../../src/Components/Universal';

type Mock = jest.Mock;

describe('Universal component unit tests.', () => {
  beforeEach(() => {
    (isPageIdentifier as any).mockClear();
    (isPageIdentifier as any).mockImplementation(() => true);
    (Loading as any).mockClear();
    (ServerError as any).mockClear();
  });

  afterEach(() => {
    (universal as Mock).mockClear();
  });

  it('Calls the `universal` function and passes the importer function and error component factory, loading component factory, minDelay, and timeout properties to it.', () => {
    expect((universal as Mock).mock.calls).toMatchObject([
      [
        importer,
        {
          error:   errorFactory,
          loading: loadingFactory,
        }
      ],
    ]);

    expect((universal as Mock).mock.calls[0][1]).toHaveProperty('minDelay');
    expect((universal as Mock).mock.calls[0][1]).toHaveProperty('timeout');
  });
});

describe('Universal component integration tests.', () => {

});

describe('errorFactory unit tests.', () => {
  it('Produces a ServerError JSX.Element when given no arguments.', () => {
    expect(errorFactory()).toEqual(<ServerError page="serverError" />);
  });
});

describe('loadingFactory unit tests.', () => {
  it('Produces a Loading JSX.Element when given no arguments.', () => {
    expect(loadingFactory()).toEqual(<Loading page="loading" />);
  });
});

describe('importer unit tests.', () => {
  beforeEach(() => {
    (isPageIdentifier as any).mockClear();
    (isPageIdentifier as any).mockImplementation(() => true);
  });

  it('Returns a promise (hopefully but seemingly unverifiably the NotFound page) if the page value is not an empty (or `/`) string, but it does not meet the isPageIdentifier type guard.', () => {
    (isPageIdentifier as any).mockImplementation(() => false);
    expect(importer({ page: PageIdentifiers.About, })).toBeInstanceOf(Promise);
  });

  it('Returns a promise (hopefully but seemingly unverifiably the Loading page) if the page value is an empty (or `/`) string, or it does meet the isPageIdentifier type guard.', () => {
    expect(importer({ page: PageIdentifiers.About, })).toBeInstanceOf(Promise);
  });

  it('Returns a promise (hopefully but seemingly unverifiably the Loading page) if the page value is an empty (or `/`) string, replacing the page argument property with defaultPageIdentifier.', () => {
    expect(importer({ page: '/' as PageIdentifiers, })).toBeInstanceOf(Promise);
  });
});