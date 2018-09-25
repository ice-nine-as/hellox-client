import {
  PageIdentifiers,
} from '../Enums/PageIdentifiers';

/* This array is used to determine which pages have the mailing list,
 * ordinarily rendered by default into the Footer component, hidden, most
 * likely so that it can be rendered elsewhere in the page at the designer's
 * discretion.
 *
 * NOTE: This array (and behavior) is not hard-coded into the Footer component,
 * (although it is in the App component), so if you are rendering the Footer
 * component outside the App component, and you want to hide the mailing list
 * widget, you will need to set the Footer's hideMailingListSignup property. */
export const pagesWithFooterMailingListHidden: Array<PageIdentifiers> = [
  PageIdentifiers.Home,
  PageIdentifiers.Podcast,
  PageIdentifiers.Podcasts,
];

export default pagesWithFooterMailingListHidden;