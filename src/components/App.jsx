import {
  FourOhFour,
} from './FourOhFour';
import {
  Loading,
} from './Loading';
import React from 'react';
import styles from '../styles/App';
import universal from 'react-universal-component';

const UniversalComponent = universal(props => import(`./${props.page}`), {
  minDelay: 1200,
  loading: Loading,
  error: FourOhFour,
});

export class App extends React.Component {
  render() {
    const { done, loading } = this.state;

    return (
      <div className={styles.test}>
        <UniversalComponent
          page='ContentTest'
          onBefore={this.beforeChange}
          onAfter={this.afterChange}
          onError={this.handleError}
        />
      </div>
    );
  }

  constructor(props) {
    super(props);

    const { history, } = props;

    this.state = {
      loading: false,
      done:    false,
      error:   false,
    }

    history.listen(({ pathname, }) => {
      console.log(pathname);
    });
  }

  changePage = () => {
    if (this.state.loading) {
      return;
    }

    const index = nextIndex(this.state.index);
    const page = pages[index];

    this.props.history.push(`/${page}`);
  }

  beforeChange = ({ isSync }) => {
    if (!isSync) {
      this.setState({
        loading: true,
        error:   false,
      });
    }
  }

  afterChange = ({ isSync, isServer, isMount }) => {
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

  handleError = (error) => {
    this.setState({
      error:   true,
      loading: false,
    });
  }
}

export default App;