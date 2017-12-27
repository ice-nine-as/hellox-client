import { App, } from './components/App';
import AppContainer from 'react-hot-loader/lib/AppContainer';
import createHistory from 'history/createBrowserHistory';
import React from 'react';
import ReactDOM from 'react-dom';

const history = createHistory();

const render = App => {
  return ReactDOM.hydrate(
    <AppContainer>
      <App history={history} />
    </AppContainer>,
    document.getElementById('root')
  );
};

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./components/App.jsx', () => {
    const App = require('./components/App').App;
    render(App);
  });
}