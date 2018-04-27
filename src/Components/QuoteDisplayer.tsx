import {
  isNode,
} from '../Modules/isNode';
import {
  QuoteIcon,
} from './Icon/QuoteIcon';
import {
  TQuoteDisplayerProps
} from '../TypeAliases/TQuoteDisplayerProps';
import {
  TQuoteDisplayerState,
} from '../TypeAliases/TQuoteDisplayerState';

import * as React from 'react';

// @ts-ignore
import _styles from '../Styles/Components/QuoteDisplayer.less';
const styles = _styles || {};

export class QuoteDisplayer extends React.Component<TQuoteDisplayerProps, TQuoteDisplayerState> {
  attributionElem: HTMLParagraphElement | null = null;
  quoteElem: HTMLParagraphElement | null = null;

  state = {
    currentIndex: 0,
  };

  render() {
    const {
      quotes,
      quotes: {
        length,
      },
    } = this.props;

    const {
      currentIndex,
    } = this.state;

    if (!isNode() && length > 1) {
      const ONE_SECOND = 1000;
      const ANIMATION_TIME = ONE_SECOND * 8;

      /* Set a microtask to add the opacity. */
      setTimeout(() => {
        if (this.quoteElem) {
          this.quoteElem.style.opacity = '1';
        }

        if (this.attributionElem) {
          this.attributionElem.style.opacity = '1';
        }
      });

      /* Two seconds before the end, start to fade out. */
      setTimeout(() => {
        if (this.quoteElem) {
          this.quoteElem.style.opacity = '0';
        }

        if (this.attributionElem) {
          this.attributionElem.style.opacity = '0';
        }
      }, ANIMATION_TIME - ONE_SECOND * 2);

      setTimeout(() => {
        this.setState({
          currentIndex: quotes && (currentIndex < length - 1) ? currentIndex + 1 : 0,
        });
      }, ANIMATION_TIME);
    }

    let child = null;
    if (quotes && currentIndex >= 0) {
      const {
        content,
        attribution,
      } = quotes[currentIndex];

      if (content) {
        child = [
          <div
            className={styles.QuoteIconContainer}
            key={1}
          >
            <QuoteIcon dontLazyLoad={true} />
          </div>,
  
          <p
            className={styles.Quote}
            key={2}
            ref={(ref) => this.quoteElem = ref}
          >
            {content}
          </p>,

          <p
            className={styles.Attribution}
            key={3}
            ref={(ref) => this.attributionElem = ref}
          >
            {attribution || null}
          </p>
        ];
      }
    }

    return (
      <div className={styles.QuoteContainer}>
        {child}
      </div>
    )
  }
}

export default QuoteDisplayer;