import {
  DoneAppAction,
} from '../Actions/App/DoneAppAction';
import {
  ErrorAppAction,
} from '../Actions/App/ErrorAppAction';
import {
  Footer,
} from '../Components/Footer';
import {
  Header,
} from '../Components/Header';
import {
  isPageIdentifier,
} from '../TypeGuards/isPageIdentifier';
import {
  isNode,
} from '../Modules/isNode';
import {
  LoadingAppAction,
} from '../Actions/App/LoadingAppAction';
import {
  makeAppAction,
} from '../Modules/makeAppAction';
import {
  PageIdentifiers,
} from '../Enums/PageIdentifiers';
import {
  PageTitles,
} from '../Enums/PageTitles';
import {
  connect, MapStateToProps,
} from 'react-redux';
import {
  Dispatch,
} from 'redux';
import {
  TAppDispatchProps,
} from '../TypeAliases/TAppDispatchProps';
import {
  TAppOwnProps,
} from '../TypeAliases/TAppOwnProps';
import {
  TAfterChangeDestructure,
} from '../TypeAliases/TAfterChangeDestructure';
import {
  Universal,
} from '../Components/Universal';

import * as React from 'react';

// @ts-ignore
import styles from '../Styles/Components/App.less';
import { TStoreProps } from '../TypeAliases/TStoreProps';
import { HamburgerOpenAction } from '../Actions/App/HamburgerOpenAction';
const _styles = styles || {};

export class App extends React.PureComponent<TAppOwnProps & TAppDispatchProps> {
  constructor(props: TAppOwnProps & TAppDispatchProps) {
    super(props);

    this.beforeChange = this.beforeChange.bind(this);
    this.afterChange  = this.afterChange.bind(this);
    this.handleError  = this.handleError.bind(this);
  }

  render() {
    const {
      location: {
        type: page,
      },
    } = this.props;

    const realPage = isPageIdentifier(page) ? page : PageIdentifiers.NotFound;

    return (
      <div className={_styles.App}>
        <Header page={realPage} />

        <Universal
          page={realPage}
          onBefore={this.beforeChange}
          onAfter={this.afterChange}
          onError={this.handleError}
        />

        <Footer page={realPage} />
      </div>
    );
  }

  beforeChange({ isSync }: { isSync: boolean }) {
    if (!isSync) {
      this.props.setError(false);
      this.props.setLoading(true);
    }

    /* Close the hamburger menu before we navigate to a new page. */
    this.props.setHamburgerStatus(false);
  }

  afterChange({ isSync, isServer, isMount, }: TAfterChangeDestructure) {
    if (!isSync) {
      this.props.setError(false);
      this.props.setLoading(false);
    } else if (!isServer && !isMount) {
      this.props.setError(false);
      this.props.setDone(true);
    }

    if (!isNode()) {
      /* Change the browser tab's title. */
      document.title = `Hello X - ${PageTitles[this.props.location.type as PageIdentifiers] || '?'}`;
    }
  }

  handleError(error: Error) {
    console.error(error);

    this.props.setError(true);
    this.props.setLoading(false);

    if (!isNode()) {
      /* Change the browser tab's title. */
      document.title = 'Hello X - Error';
    }
  }
}

export const mapStateToProps: MapStateToProps<TAppOwnProps, {}, TStoreProps> = ({
  done,
  error,
  hamburgerOpen,
  loading,
  location,
}) => {
  return {
    done,
    error,
    hamburgerOpen,
    loading,
    location,
  };
};

export const mapDispatchToProps = (dispatch: Dispatch<TAppDispatchProps>) => {
  return {
    setDone(value: boolean) {
      return dispatch(makeAppAction(DoneAppAction, value));
    },

    setError(value: boolean) {
      return dispatch(makeAppAction(ErrorAppAction, value));
    },

    setHamburgerStatus(value: boolean) {
      return dispatch(makeAppAction(HamburgerOpenAction, value));
    },

    setLoading(value: boolean) {
      return dispatch(makeAppAction(LoadingAppAction, value));
    },
  };
};

export const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default App;