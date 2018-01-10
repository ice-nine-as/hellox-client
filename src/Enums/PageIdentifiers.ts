export enum PageIdentifiers {
  About       = 'About',
  Ask         = 'Ask',
  Home        = 'Home',
  Listen      = 'Listen',
  Login       = 'Login',
  Logout      = 'Logout',
  NotFound    = 'NotFound',
  ReadWrite   = 'ReadWrite',
  ServerError = 'ServerError',
  Talk        = 'Talk',
}

export const defaultPageIdentifier: PageIdentifiers.Home = PageIdentifiers.Home;

export default PageIdentifiers;