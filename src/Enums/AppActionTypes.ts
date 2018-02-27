export enum AppActionTypes {
  /* Location is taken care of by redux-first-router-link. */
  Done          = 'DONE',
  Error         = 'ERROR',
  HamburgerOpen = 'HAMBURGER_OPEN',
  Language      = 'LANGUAGE',
  Loading       = 'LOADING',
  Rss           = 'RSS',
  ViewportState = 'VIEWPORT_STATE',
}

export default AppActionTypes;