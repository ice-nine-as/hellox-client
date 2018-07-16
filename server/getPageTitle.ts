import {
  LocationState,
} from 'redux-first-router';
import {
  PageIdentifiers,
} from '../src/Enums/PageIdentifiers';
import {
  PageTitles,
} from '../src/Enums/PageTitles';

export function getPageTitle(location: LocationState): string {
  return `Hello X - ${PageTitles[location.type as PageIdentifiers] || '?'}`;
}

export default getPageTitle;