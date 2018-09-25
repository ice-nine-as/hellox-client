import {
  createAppAction,
} from '../Actions/Creators/createAppAction';
import {
  createLinkAction,
} from '../Actions/Creators/createLinkAction';
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
} from '../Functions/isNode';
import {
  LoadingAppAction,
} from '../Actions/App/LoadingAppAction';
import {
  PageIdentifiers,
} from '../Enums/PageIdentifiers';
import {
  pagesWithFooterMailingListHidden,
} from '../Properties/pagesWithFooterMailingListSignupHidden';
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
  ServerErrorLinkAction,
} from '../Actions/Link/ServerErrorLinkAction';
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
import _styles from '../Styles/Components/App.less';
const styles = _styles || {};

export class App extends React.PureComponent<TAppStoreProps & TAppDispatchProps> {
  constructor(props: TAppStoreProps & TAppDispatchProps, context?: any) {
    super(props, context);

    this.beforeChange = this.beforeChange.bind(this);
    this.afterChange  = this.afterChange.bind(this);
    this.handleError  = this.handleError.bind(this);
  }

  render() {
    const {
      hamburgerOpen,
      location: {
        type: page,
      },

      setHamburgerStatus,
    } = this.props;

    const realPage = isPageIdentifier(page) ? page : PageIdentifiers.NotFound;

    return (
      <div className={`${styles.App} Page-${page}`}>
        <Header page={realPage} />

        <div
          className={styles.PageContainer}
          onClick={() => {
            /* Close hamburger menu when any location on page is clicked. */
            if (hamburgerOpen === true) {
              setHamburgerStatus(false);
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

        <Footer
          hideMailingListSignup={(() => (
            /* Hide mailing list signup if the page identifier exists in the
             * pagesWithFooterMailingListHidden array. */
            pagesWithFooterMailingListHidden.indexOf(realPage) !== -1
          ))()}
          page={realPage}  
        />
      </div>
    );
  }

  beforeChange({ isSync }: { isSync: boolean }) {
    const {
      hamburgerOpen,
      setError,
      setHamburgerStatus,
      setLoading,
    } = this.props;

    if (!isSync) {
      setError(false);
      setLoading(true);
    }

    /* Close the hamburger menu before we navigate to a new page. */
    if (hamburgerOpen === true) {
      setHamburgerStatus(false);
    }
  }

  afterChange({ isSync, isServer, isMount, }: TAfterChangeDestructure) {
    const {
      setDone,
      setError,
      setLoading,
      location,
    } = this.props;

    if (!isSync) {
      setError(false);
      setLoading(false);
    } else if (!isServer && !isMount) {
      setError(false);
      setDone(true);
    }

    if (!isNode()) {
      /* Change the browser tab's title. */
      document.title = 'Hello X - ' +
        PageTitles[location.type as PageIdentifiers] || '?';
    }
  }

  handleError(error: Error) {
    const {
      setError,
      setLoading,
    } = this.props;

    console.error(error);

    setError(true);
    setLoading(false);

    if (!isNode()) {
      /* Change the browser tab's title. */
      document.title = 'Hello X - Error';
    }
  }

  componentDidCatch(error: Error, info: any) {
    const {
      setErrorPage,
    } = this.props;

    console.error(info);
    this.handleError(error);
    setErrorPage();
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

    setErrorPage() {
      return dispatch(createLinkAction(ServerErrorLinkAction));
    },
  };
};

export const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default App;