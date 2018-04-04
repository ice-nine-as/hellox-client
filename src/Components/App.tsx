import {
  createAppAction,
} from '../Actions/Creators/createAppAction';
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
  HamburgerOpenAction,
} from '../Actions/App/HamburgerOpenAction';
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
  PageIdentifiers,
} from '../Enums/PageIdentifiers';
import {
  PageTitles,
} from '../Enums/PageTitles';
import {
  connect,
  MapStateToProps,
} from 'react-redux';
import {
  Dispatch,
} from 'redux';
import {
  TAfterChangeDestructure,
} from '../TypeAliases/TAfterChangeDestructure';
import {
  TAppDispatchProps,
} from '../TypeAliases/TAppDispatchProps';
import {
  TAppStoreProps,
} from '../TypeAliases/TAppOwnProps';
import {
  TStoreProps,
} from '../TypeAliases/TStoreProps';
import {
  Universal,
} from '../Components/Universal';

import * as React from 'react';

// @ts-ignore
import styles from '../Styles/Components/App.less';
const _styles = styles || {};

export class App extends React.PureComponent<TAppStoreProps & TAppDispatchProps> {
  constructor(props: TAppStoreProps & TAppDispatchProps) {
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
      <div className={`${_styles.App} Page-${page}`}>
        <Header page={realPage} />

        <div
          className={_styles.PageContainer}
          onClick={() => {
            /* Close hamburger menu when any location on page is clicked. */
            if (this.props.hamburgerOpen === true) {
              this.props.setHamburgerStatus(false);
            }
          }}
        >
          <Universal
            page={realPage}
            onAfter={this.afterChange}
            onBefore={this.beforeChange}
            onError={this.handleError}
          />
        </div>

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
    if (this.props.hamburgerOpen === true) {
      this.props.setHamburgerStatus(false);
    }
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

export const mapStateToProps: MapStateToProps<TAppStoreProps, {}, TStoreProps> = ({
  done,
  error,
  hamburgerOpen,
  loading,
  location,
}) => ({
  done,
  error,
  hamburgerOpen,
  loading,
  location,
});

export const mapDispatchToProps = (dispatch: Dispatch<TAppDispatchProps>) => {
  return {
    setDone(value: boolean) {
      return dispatch(createAppAction(DoneAppAction, value));
    },

    setError(value: boolean) {
      return dispatch(createAppAction(ErrorAppAction, value));
    },

    setHamburgerStatus(value: boolean) {
      return dispatch(createAppAction(HamburgerOpenAction, value));
    },

    setLoading(value: boolean) {
      return dispatch(createAppAction(LoadingAppAction, value));
    },
  };
};

export const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default App;