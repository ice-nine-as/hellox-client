export enum PageIdentifiers {
  About       = 'about',
  Home        = '',
  Login       = 'login',
  Logout      = 'logout',
  NotFound    = 'notFound',
  ServerError = 'serverError'
}

export const defaultPageIdentifier: PageIdentifiers.Home = PageIdentifiers.Home;

export default PageIdentifiers;