import {
  connect, MapStateToProps,
} from 'react-redux';
import {
  createRssThunk,
} from '../Actions/Creators/createRssThunk';
import {
  pickFeed,
} from '../Functions/pickFeed';
import {
  isNode,
} from '../Functions/isNode';
import {
  QuoteDisplayer,
} from './QuoteDisplayer';
import {
  TFeedsMap,
} from '../TypeAliases/TFeedsMap';
import {
  TQuoteDisplayDispatchProps,
} from '../TypeAliases/TQuoteDisplayDispatchProps';
import {
  TQuoteDisplayStoreProps,
} from '../TypeAliases/TQuoteDisplayStoreProps';
import {
  TStoreProps,
} from '../TypeAliases/TStoreProps';

import * as React from 'react';

// @ts-ignore
import _styles from '../Styles/Components/QuoteDisplay.less';
const styles = _styles || {};

export const strings = {
  LOAD_ERROR:
    'An error was encountered in loading the team members feed. Sorry!',
};

export class QuoteDisplay extends React.Component<TQuoteDisplayStoreProps & TQuoteDisplayDispatchProps, { error: string, }> {
  constructor(props: any, context?: any) {
    super(props, context);

    this.state = {
      error: '',
    };
  }

  doLoad() {
    const {
      getQuotesFeed,
      feeds,
      language,
    } = this.props;

    const rejector = (reason: Error) => {
      console.error(reason);
      this.setState({
        error: (reason || {} as any).message || strings.LOAD_ERROR,
      });
    };

    const {
      feed,
      key,
    } = pickFeed({
      feeds,
      language,
      type: 'quote',
    });

    if (!feed) {
      getQuotesFeed(key).then(() => {}, (reason) => rejector(reason));
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

    const {
      error,
    } = this.state;

    const {
      feed,
    } = pickFeed({
      feeds,
      language,
      type: 'quote',
    });

    const quotes = feed && feed.items && feed.items[0] ?
      JSON.parse(feed.items[0].description) :
      null;

    let child;
    if (error) {
      child = 'Error loading quote feed.';
    } else if (!quotes) {
      child = null;
    } else {
      child = <QuoteDisplayer quotes={quotes} />;
    }

    return (
      <div className={styles.QuoteDisplay}>
        {child}
      </div>
    );
  }
}

export const mapStateToProps: MapStateToProps<TQuoteDisplayStoreProps, {}, TStoreProps> = ({
  feeds,
  language,
}) => ({
  feeds,
  language,
});

export const mapDispatchToProps = (dispatch: Function) => ({
  getQuotesFeed(key: keyof TFeedsMap) {
    const thunk = createRssThunk({
      feedKey: key,
    });

    return dispatch(thunk);
  },
})

export const ConnectedQuoteDisplay = connect(mapStateToProps, mapDispatchToProps)(QuoteDisplay);

export default QuoteDisplay;