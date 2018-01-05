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
  PageIdentifiers,
} from '../Pages/PageIdentifiers';
import {
  Universal,
} from '../Components/Universal';
import {
  TAppProps,
} from '../TypeAliases/TAppProps';
import {
  TAppState,
} from '../TypeAliases/TAppState';

import * as React from 'react';

// @ts-ignore
import styles from '../Styles/App';

type TAfterChangeDestructure = {
  isSync:   boolean,
  isServer: boolean,
  isMount:  boolean,
};


export class App extends React.Component<TAppProps, TAppState> {
  constructor(props: TAppProps) {
    super(props);

    const { history, } = props;

    const pathname = history.location.pathname.slice(1);
    const realPath = isPageIdentifier(pathname) ?
      pathname :
      PageIdentifiers.NotFound;

    this.state = {
      page:    realPath,
      loading: false,
      done:    false,
      error:   false,
    };

    history.listen(({ pathname, }: { pathname: string, }) => {
      const trimmed = pathname.slice(1);
      if (isPageIdentifier(trimmed)) {
        this.setState({ page: trimmed, });
      } else {
        this.setState({ page: PageIdentifiers.NotFound, });
      }
    });
    
    this.beforeChange = this.beforeChange.bind(this);
    this.afterChange  = this.afterChange.bind(this);
    this.handleError  = this.handleError.bind(this);
  }

  render() {
    const {
      page,
    } = this.state;

    debugger;

    return (
      <div className={styles.App}>
        <Header />

        <Universal
          page={page}
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
      this.setState({
        loading: true,
        error:   false,
      });
    }
  }

  afterChange({ isSync, isServer, isMount }: TAfterChangeDestructure) {
    if (!isSync) {
      this.setState({
        loading: false,
        error:   false,
      });
    } else if (!isServer && !isMount) {
      this.setState({
        done:  true,
        error: false,
      });
    }
  }

  handleError(error: Error) {
    console.log(error);

    this.setState({
      error:   true,
      loading: false,
    });
  }
}

export default App;