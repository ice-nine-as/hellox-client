import {
  InstagramIcon,
} from './Icon/InstagramIcon';
import {
  FacebookIcon,
} from './Icon/FacebookIcon';
import {
  MailChimpSignup,
} from './MailChimpSignup';
import {
  SiteMap,
} from './SiteMap';
import {
  SponsorIcons,
} from './SponsorIcons';
import {
  TFooterProps,
} from '../TypeAliases/TFooterProps';
import {
  TwitterIcon,
} from './Icon/TwitterIcon';

import * as React from 'react';

// @ts-ignore
import _styles from '../Styles/Components/Footer.less';
const styles = _styles || {};

export class Footer extends React.PureComponent<TFooterProps> {
  render() {
    const {
      hideMailingListSignup,
    } = this.props;

    return (
      <div className={`${styles.Footer} Footer Page-${this.props.page}`}>
        <div className={`${styles.VerticalHalf} ${styles.First}`}>
          <div className={`${styles.HorizontalHalf} ${styles.Contact} light`}>
            <div>
              <h3 className={`${styles.Header}`}>
                <strong>Contact us</strong>
              </h3>

              <p className={`${styles.ContactPara} ${styles.Email}`}>
                <a href="mailto:helloX@ice-9.no">
                  helloX@ice-9.no
                </a>
              </p>
            </div>

            <div className={styles.IconsContainer}>
              <FacebookIcon />
              <TwitterIcon />
              <InstagramIcon />
            </div>
          </div>

          <div className={`${styles.HorizontalHalf} ${styles.SiteMap}`}>
            <h3 className={`${styles.Header}`}>
              <strong>Menu</strong>
            </h3>

            <br />

            <SiteMap />
          </div>
        </div>

        <div className={`${styles.VerticalHalf} ${styles.Second}`}>
          {/* Show the mailing list component by default, but allow the parent
            * component to hide it if desired. */
            hideMailingListSignup ?
              null :
              <MailChimpSignup />
          }

          <div className={styles.SponsorIconsWrapper}>
            <SponsorIcons />
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;