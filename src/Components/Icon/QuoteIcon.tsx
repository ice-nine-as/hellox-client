import {
  Icon,
} from './Icon';
import {
  IIconProps,
} from '../../Interfaces/IIconProps';
import {
  ImageUrls,
} from '../../Enums/ImageUrls';

import * as React from 'react';

// @ts-ignore
import _styles from '../../Styles/Components/Icon/QuoteIcon.less';
const styles = _styles || {};

export class QuoteIcon extends React.PureComponent<IIconProps> {
  render() {
    const addIns: { [key: string]: any } = {};
    if (this.props.dontLazyLoad) {
      addIns.dontLazyLoad = this.props.dontLazyLoad;
    }

    if (this.props.offset) {
      addIns.offset = this.props.offset;
    }

    if (this.props.url) {
      addIns.url = this.props.url;
    }

    return (
      <Icon {...addIns}>
        <img
          alt="A stylized quotation mark."
          className={styles.QuoteIcon}
          src={ImageUrls.QuoteIcon}
        />
      </Icon>
    );
  }
}

export default QuoteIcon;