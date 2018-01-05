// @ts-ignore
import AppContainer from 'react-hot-loader/lib/AppContainer';
import createHistory from 'history/createBrowserHistory';
import {
  hydrate,
} from 'react-dom';

const history = createHistory();

const render = (App: any) => {
  return hydrate(
    <AppContainer>
      <App history={history} />
    </AppContainer>,

    // @ts-ignore
    document.getElementById('root')
  );
};

// @ts-ignore
if (process.env.NODE_ENV === 'development' && module.hot) {
  // @ts-ignore
  module.hot.accept('./Components/App', () => {
    import('./Components/App').then((imported) => {
      render(imported.App);
    });
  });
}