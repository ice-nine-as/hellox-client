/*import {
  getFeed,
} from '../Modules/getFeed';
import {
  QuoteIcon,
} from './Icon/QuoteIcon';
import {
  TQuoteDisplayProps,
} from '../TypeAliases/TQuoteDisplayProps';

import * as React from 'react';

// @ts-ignore
import _styles from '../Styles/Components/QuoteDisplay';
import { connect } from 'react-redux';
const styles = _styles || {};

export const strings = {
  LOAD_ERROR:
    'An error was encountered in loading the team members feed. Sorry!',
};

export class QuoteDisplay extends React.Component<TQuoteDisplayProps, { error: string, }> {
  constructor(props: any, context?: any) {
    super(props, context);

    this.state = {
      error: '',
    };
  }

  doLoad() {
    const {
      feeds: {
        TeamMembers: teamMembersFeed,
      },
    } = this.props;

    const rejector = (reason: Error) => {
      console.error(reason);
      this.setState({
        error: (reason || {} as any).message || strings.LOAD_ERROR,
      });
    };

    if (!teamMembersFeed) {
      this.props.getTeamMembersFeed()
        .then(
          // Resolve
          () => {},

          // Reject
          (reason) => rejector(reason)
        );
    }
  }

  componentDidMount() {
    if (!isNode()) {
      this.doLoad();
    }
  }


  render() {
    const {
      feeds,
      language,
    } = this.props;

    const feed = getFeed({
      feeds,
      language,
      type: 'quote',
    }).feed;

    const quotes = feed && feed.items

    return (
      <div className={styles.QuoteContainer}>
        <div className={styles.QuoteIconContainer}>
          <QuoteIcon dontLazyLoad={true} />
        </div>

        <span className={`${styles.Quote} light`}>
          {
            <QuoteDisplayer quotes={} />
          }
        </span>
      </div>
    )
  }
}

export const ConnectedQuoteDisplay = connect(mapStateToProps, mapDispatchToProps);

export default QuoteDisplay;*/