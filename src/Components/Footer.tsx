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
const LazyLoad = require('react-lazy-load').default;

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
          <LazyLoad offset={800} placeholder={<div style={{ height: '200px' }}></div>}>
            <SponsorIcons />
          </LazyLoad>
        </div>
      </div>
    );
  }
}

export default Footer;