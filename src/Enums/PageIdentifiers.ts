export enum PageIdentifiers {
  About       = 'About',
  Ask         = 'Ask',
  Home        = 'Home',
  Listen      = 'Listen',
  Login       = 'Login',
  Logout      = 'Logout',
  NotFound    = 'NotFound',
  ServerError = 'ServerError',
  Talk        = 'Talk',
  Write       = 'Write',
}

export const defaultPageIdentifier: PageIdentifiers.Home = PageIdentifiers.Home;

export default PageIdentifiers;