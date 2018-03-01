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
  LoadingAppAction,
} from '../Actions/App/LoadingAppAction';
import {
  makeAppAction,
} from '../Modules/makeAppAction';
import {
  makeViewportStateAction,
} from '../Modules/makeViewportStateAction';
import {
  PageIdentifiers,
} from '../Enums/PageIdentifiers';
import {
  connect,
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
import {
  ViewportStateAction,
} from '../Actions/App/ViewportStateAction';
import {
  ViewportStates,
} from '../Enums/ViewportStates';

import MediaQuery from 'react-responsive';

import * as React from 'react';

// @ts-ignore
import styles from '../Styles/Components/App.less';
const _styles = styles || {};

export class App extends React.PureComponent<TAppOwnProps & TAppDispatchProps> {
  constructor(props: TAppOwnProps & TAppDispatchProps) {
    super(props);

    this.beforeChange = this.beforeChange.bind(this);
    this.afterChange  = this.afterChange.bind(this);
    this.handleError  = this.handleError.bind(this);
  }

  render() {
    let {
      location: {
        type: page,
      },
    } = this.props;

    page = isPageIdentifier(page) ? page : PageIdentifiers.NotFound;

    return (
      <div className={_styles.App}>
        <MediaQuery minDeviceWidth={1001}>
          <MediaQuery maxWidth={1000}>
            {
              (matches) => {
                if (matches) {
                  const state = ViewportStates.Mobile;
                  document.body.classList.add(state);
                  document.body.classList.remove(ViewportStates.Monitor);
                  setTimeout(() => this.props.setViewportState(state));
                }

                return null;
              }
            }
          </MediaQuery>

          <MediaQuery minWidth={1001}>
            {
              (matches) => {
                if (matches) {
                  const state = ViewportStates.Monitor;
                  document.body.classList.add(state);
                  document.body.classList.remove(ViewportStates.Mobile);
                  setTimeout(() => this.props.setViewportState(state));
                }

                return null;
              }
            }
          </MediaQuery>
        </MediaQuery>

        <MediaQuery maxDeviceWidth={1000}>
          {
            (matches) => {
              if (matches) {
                const state = ViewportStates.Mobile;
                document.body.classList.add(state)
                document.body.classList.remove(ViewportStates.Monitor);
                setTimeout(() => this.props.setViewportState(state));
              }

              return null;
            }
          }
        </MediaQuery>

        <Header />

        <Universal
          page={page as PageIdentifiers}
          onBefore={this.beforeChange}
          onAfter={this.afterChange}
          onError={this.handleError}
        />

        <Footer />
      </div>
    );
  }

  beforeChange({ isSync }: { isSync: boolean }) {
    if (!isSync) {
      this.props.setError(false);
      this.props.setLoading(true);
    }
  }

  afterChange({ isSync, isServer, isMount }: TAfterChangeDestructure) {
    if (!isSync) {
      this.props.setError(false);
      this.props.setLoading(false);
    } else if (!isServer && !isMount) {
      this.props.setDone(true);
      this.props.setError(false);
    }
  }

  handleError(error: Error) {
    console.log(error);

    this.props.setError(true);
    this.props.setLoading(false);
  }
}

export const mapStateToProps = ({
  done,
  error,
  loading,
  location,
}: TAppOwnProps) => {
  return {
    done,
    error,
    loading,
    location,
  };
};

export const mapDispatchToProps = (dispatch: Dispatch<TAppDispatchProps>) => {
  return {
    setDone: (value: boolean) => {
      return dispatch(makeAppAction(DoneAppAction, value));
    },

    setError: (value: boolean) => {
      return dispatch(makeAppAction(ErrorAppAction, value));
    },

    setLoading: (value: boolean) => {
      return dispatch(makeAppAction(LoadingAppAction, value));
    },

    setViewportState: (value: ViewportStates) => {
      return dispatch(makeViewportStateAction(ViewportStateAction, value));
    },
  };
};

export const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default App;