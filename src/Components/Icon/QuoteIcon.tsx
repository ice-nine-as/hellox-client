import {
  Icon,
} from './Icon';
import {
  ImageUrls,
} from '../../Enums/ImageUrls';
import {
  TQuoteIconProps,
} from '../../TypeAliases/TQuoteIconProps';

import * as React from 'react';

// @ts-ignore
import styles from '../../Styles/Components/Icon/QuoteIcon.less';
const _styles = styles || {};

export class QuoteIcon extends React.PureComponent<TQuoteIconProps> {
  render() {
    return (
      <Icon>
        <img
          className={_styles.QuoteIcon}
          src={ImageUrls.QuoteIcon}
        />
      </Icon>
    );
  }
}

export default QuoteIcon;