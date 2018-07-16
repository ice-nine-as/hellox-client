import {
  InstagramIcon,
} from './Icon/InstagramIcon';
import {
  FacebookIcon,
} from './Icon/FacebookIcon';
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
          {/* Mailchimp */}
          <div id="mc_embed_signup">
            <form
              action="https://ice-9.us16.list-manage.com/subscribe/post?u=df70196a51c2b6c343aa52c4e&amp;id=74777a8f7e"
              className="validate"
              id="mc-embedded-subscribe-form"
              method="post"
              name="mc-embedded-subscribe-form"
              noValidate
              target="_blank"
            >
              <div id="mc_embed_signup_scroll">
                <label htmlFor="mce-EMAIL">
                  Join our newsletter to get monthly updates from us
                </label>

                <input
                  type="email"
                  value=""
                  name="EMAIL"
                  className="email"
                  id="mce-EMAIL"
                  placeholder="email address"
                  required
                />

                <div
                  style={{
                    position: 'absolute',
                    left: '-5000px',
                  }}
                  aria-hidden="true"
                >
                  {/* Fake label to avoid lowering SEO scores. */}
                  <label htmlFor="b_df70196a51c2b6c343aa52c4e_74777a8f7e" hidden style={{ display: 'none' }}>
                    Unused
                  </label>

                  {/* Fake input to fool bots. */}
                  <input
                    id="b_df70196a51c2b6c343aa52c4e_74777a8f7e"
                    type="text"
                    name="b_df70196a51c2b6c343aa52c4e_74777a8f7e"
                    tabIndex={-1}
                    value=""
                  />
                </div>

                <div className="clear">
                  <input
                    className="button"
                    id="mc-embedded-subscribe"
                    name="subscribe"
                    type="submit"
                    value="Subscribe"
                  />
                </div>
              </div>
            </form>
          </div>

          <div className={styles.SponsorIconsWrapper}>
            <SponsorIcons />
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;