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
  PageIdentifiers,
} from '../Enums/PageIdentifiers';
import {
  connect,
  Dispatch,
} from 'react-redux';
import {
  TAppProps,
} from '../TypeAliases/TAppProps';
import {
  TAfterChangeDestructure,
} from '../TypeAliases/TAfterChangeDestructure';
import {
  Universal,
} from '../Components/Universal';

import * as React from 'react';

// @ts-ignore
import styles from '../Styles/Components/App.less';

export class AppConstructor extends React.PureComponent<TAppProps> {
  constructor(props: TAppProps) {
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
      <div className={styles.App}>
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
}: TAppProps) => {
  return {
    done,
    error,
    loading,
    location,
  };
};

export const mapDispatchToProps = (dispatch: Dispatch<{}>) => {
  return {
    setDone: (value: boolean) => {
      return dispatch(Object.assign({}, DoneAppAction, { value, }));
    },

    setError: (value: boolean) => {
      return dispatch(Object.assign({}, ErrorAppAction, { value, }));
    },

    setLoading: (value: boolean) => {
      return dispatch(Object.assign({}, LoadingAppAction, { value }));
    },
  };
};

export const App = connect(mapStateToProps, mapDispatchToProps)(AppConstructor);

export default App;