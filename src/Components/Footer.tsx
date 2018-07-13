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
import styles from '../Styles/Components/Footer.less';
const _styles = styles || {};

export class Footer extends React.PureComponent<TFooterProps> {
  render() {
    return (
      <div className={`${_styles.Footer} Footer Page-${this.props.page}`}>
        <div className={`${_styles.VerticalHalf} ${_styles.First}`}>
          <div className={`${_styles.HorizontalHalf} ${_styles.Contact} light`}>
            <div>
              <h3 className={`${_styles.Header}`}>
                Contact us
              </h3>

              <p className={`${_styles.ContactPara} ${_styles.Email}`}>
                <a href="mailto:helloX@ice-9.no">
                  helloX@ice-9.no
                </a>
              </p>
            </div>

            <div className={_styles.IconsContainer}>
              <FacebookIcon />
              <TwitterIcon />
              <InstagramIcon />
            </div>
          </div>

          <div className={`${_styles.HorizontalHalf} ${_styles.SiteMap}`}>
            <h3 className={`${_styles.Header}`}>
              Menu
            </h3>

            <br />

            <SiteMap />
          </div>
        </div>

        <div className={`${_styles.VerticalHalf} ${_styles.Second}`}>
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
                  {/* Fake input to fool bots. */}
                  <input
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