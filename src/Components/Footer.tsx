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
      <div className={`${_styles.Footer} Footer`}>
        <div className={`${_styles.VerticalHalf} ${_styles.First}`}>
          <div className={`${_styles.HorizontalHalf} ${_styles.Contact}`}>
            <h3 className={_styles.ContactHeader}>
              Contact us
            </h3>

            <p className={`${_styles.ContactPara} ${_styles.Names}`}>
              Ice-9 · Christine Cynn
            </p>

            <p className={`${_styles.ContactPara} ${_styles.Email}`}>
              <a href="mailto:christine@ice-9.no">
                christine@ice-nine.no
              </a>
            </p>

            <p className={`${_styles.ContactPara} ${_styles.Phone}`}>
              <a href="tel:+99999999">
                99 99 99 99
              </a>
            </p>

            <div className={_styles.IconsContainer}>
              <FacebookIcon />
              <TwitterIcon />
              <InstagramIcon />
            </div>
          </div>

          <div className={`${_styles.HorizontalHalf} ${_styles.SiteMap}`}>
            <h3 className={_styles.SiteMapHeader}>
              Menu
            </h3>

            <SiteMap />
          </div>
        </div>

        <div className={`${_styles.VerticalHalf} ${_styles.Second}`}>
          Sponsor icons go here.
        </div>
      </div>
    );
  }
}

export default Footer;